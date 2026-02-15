const Student = require("../../model/Acedemic/student.model");
const Exam = require("../../model/Acedemic/exam.model");
const ExamResult = require("../../model/Acedemic/examResults.model");
const Admin = require("../../model/Staff/admin.model");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorHandler");
const sendToken = require("../../utils/generateToken");
const APIFeatures = require("../../middlewares/advanceResults");

exports.adminRegisterStudents = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter name, email & password", 400));
  }
  const adminFound = await Admin.findById(req.user._id);
  if (!adminFound) {
    return next(new ErrorHandler("Admin Not Found", 404));
  }
  const studentFound = await Student.findOne({ email });
  if (studentFound) {
    return next(new ErrorHandler("Student already exists", 409));
  }
  const studentCreated = await Student.create({
    name,
    email,
    password,
  });
  //push teacher into admin profile.
  adminFound.students.push(studentCreated?._id);
  await adminFound.save();
  // sendToken(studentCreated, 200, res);\
  res.status(201).json({
    success: true,
    message: "Students fetched succesfully",
    data: studentCreated,
  });
});

exports.loginStudents = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  const student = await Student.findOne({ email }).select("+password");
  if (!student) {
    return next(new ErrorHandler("Invalid Login Credentials", 403));
  }
  const isMatched = await student.verifyPassword(password);
  if (!isMatched) {
    return next(new ErrorHandler("Invalid Login Credentials", 403));
  }
  sendToken(student, 200, res);
});

exports.getAllStudents = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const students = await new APIFeatures(Student.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    success: true,
    message: "Student fetched succesfully",
    data: students.data,
    ...students.pagination,
  });
});

exports.getStudentsByAdmin = catchAsyncError(async (req, res, next) => {
  const StudentID = req.params.studentID;
  const student = await Student.findById(StudentID);
  if (!student) {
    return next(new ErrorHandler("Student Not Found", 404));
  }
  res.status(201).json({
    success: true,
    message: "Student fetched succesfully",
    data: student,
  });
});

exports.getStudentsProfile = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user?._id)
    .select("-password -createdAt -updatedAt")
    .populate("examResults");
  if (!student) {
    return next(new ErrorHandler("Student Not Found", 404));
  }
  //create custom student Profile.
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAdmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWithdrawn: student?.isWithdrawn,
    studentId: student?.studentId,
    isWithdrawn: student?.isWithdrawn,
    perfectName: student?.perfectName,
  };
  //get student exam result. we dont want to return all exam result.
  const examResult = student?.examResults;
  const currentExamResult = examResult[examResult.length - 1];
  //check if exam is being published.
  const isPublished = currentExamResult?.isPublished;

  res.status(201).json({
    success: true,
    message: "Student fetched succesfully",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
  });
});

exports.studentUpdatePassword = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("+password");
  //check previous password.
  const isPasswordMatched = await student.verifyPassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }
  student.password = req.body.password;
  await student.save();
  sendToken(student, 200, res);
});

exports.studentUpdateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  //if email is taken.
  const student = await Student.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    success: true,
    data: student,
    message: "student updated succesfully",
  });
});

exports.adminUpdateStudents = catchAsyncError(async (req, res, next) => {
  const {
    classLevels,
    academicYear,
    program,
    name,
    email,
    perfectName,
    isWithdrawn,
    isSuspended,
  } = req.body;

  const studentFound = await Student.findById(req.params.studentID);
  if (!studentFound) {
    return next(new ErrorHandler("Student Not Found", 404));
  }
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        perfectName,
        isWithdrawn,
        isSuspended,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    },
  );
  res.status(200).json({
    success: true,
    data: studentUpdated,
    message: "Student updated succesfully",
  });
});

exports.getAllExamForStudent = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 2;

  const studentFound = await Student.findById(req.user._id);
  if (!studentFound) {
    return next(new ErrorHandler("Student not found", 404));
  }

  // exams already taken
  const takenExams = await ExamResult.find({
    studentID: studentFound.studentId,
  }).select("exam");
  
  const takenExamIds = takenExams.map((e) => e.exam);

  // only exams NOT taken
  const exams = await new APIFeatures(
    Exam.find({
      _id: { $nin: takenExamIds },
    })
      .populate("questions")
      .populate("subject")
      .populate("academicTerm"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute();

  res.status(200).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams.data,
    ...exams.pagination,
  });
});

exports.writeExam = catchAsyncError(async (req, res, next) => {
  const studentFound = await Student.findById(req.user?._id);
  if (!studentFound) {
    return next(new ErrorHandler("Student Not Found", 404));
  }
  const examFound = await Exam.findById(req.params.examID)
    .populate("questions")
    .populate("academicTerm");
  if (!examFound) {
    return next(new ErrorHandler("Exam Not Found", 404));
  }
  const questions = examFound?.questions;
  const studentAnswers = req.body.answers;
  //check if all questions are answered.
  if (studentAnswers.length !== questions.length) {
    return next(
      new ErrorHandler("You have not anwered all the questions.", 401),
    );
  }
  //check if students already taken the exam.
  studentFoundInResults = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    exam: req.params.examID,
  });
  if (studentFoundInResults) {
    return next(new ErrorHandler("You have Already written an Exam", 401));
  }
  //check if students is suspended.
  if (studentFound.isWithdrawn || studentFound.isSuspended) {
    return next(
      new ErrorHandler(
        "You have Suspended/Withdrawn, Not allowed to attend the exam.",
        403,
      ),
    );
  }
  //Build Report Object.
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let remarks = 0;
  let grade = 0;
  let score = 0;
  let status = 0;
  let answeredQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    //find the questions.
    const question = questions[i];
    //check if answer is correct.
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }
  //Calculate Reports.
  totalQuestions = questions.length;
  grade = (correctAnswers / questions.length) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.questions,
      correctAnswers: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });
  //Calculate the status.
  if (grade >= 50) {
    status = "Pass";
  } else {
    status = "Fail";
  }
  //remarks.
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 50) {
    remarks = "Good";
  } else {
    remarks = "Poor";
  }
  //generate exam results.
  const examResult = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answeredQuestions,
  });
  //push the results into exam.
  studentFound.examResults.push(examResult?._id);
  await studentFound.save();

  //Promoting.
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound.currentClassLevel === "Level 100"
  ) {
    //Promote student to Level 200.
    studentFound.classLevels.push("Level 200");
    studentFound.currentClassLevel = "Level 200";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound.currentClassLevel === "Level 200"
  ) {
    //Promote student to Level 200.
    studentFound.classLevels.push("Level 300");
    studentFound.currentClassLevel = "Level 300";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound.currentClassLevel === "Level 300"
  ) {
    //Promote student to Level 200.
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();
    await studentFound.save();
  }
  res.status(200).json({
    success: true,
    message:
      "Your exam has been updated succesfully, check later for the results.",
  });
});
