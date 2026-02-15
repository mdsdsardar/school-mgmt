const Teacher = require("../../model/Staff/teacher.model");
const Admin = require("../../model/Staff/admin.model");
const ErrorHandler = require("../../utils/errorHandler");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const sendToken = require("../../utils/generateToken");
const APIFeatures = require("../../middlewares/advanceResults");
const { pickFields } = require("../../utils/filteredMW");

exports.adminRegisterTeacher = catchAsyncError(async (req, res, next) => {
  const adminFound = await Admin.findById(req.user._id);
  if (!adminFound) {
    return next(new ErrorHandler("Admin Not Found", 404));
  }
  const teacher = await Teacher.findOne({ email: req.body.email });
  if (teacher) {
    return next(new ErrorHandler("Teacher already employed", 409));
  }
  const allowedFields = ["name", "email", "password"];
  const teacherData = pickFields(req.body, allowedFields);
  teacherData.createdBy = req.user._id;
  const user = new Teacher(teacherData);
  await user.save();
  adminFound.teachers.push(user?._id);
  await adminFound.save();
  // sendToken(user, 200, res);
  res.status(201).json({
    success: true,
    message: "Teacher Registred succesfully",
    data: user,
  });
});

exports.loginTeacher = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  const teacher = await Teacher.findOne({ email }).select("+password");
  if (!teacher) {
    return next(new ErrorHandler("Invalid Login Credentials", 401));
  }
  const isPasswordMatched = await teacher.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Login Credentials", 401));
  }
  sendToken(teacher, 200, res);
});

exports.getAllTeachers = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 2;
  const result = await new APIFeatures(
    // Teacher.find().populate({
    //   path: "examsCreated",
    //   populate: {
    //     path: "questions",
    //   },
    // }),
    Teacher.find().populate("academicYear"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute();
  res.status(200).json({
    success: true,
    message: "Sucesfully fetched all teacher's from DB.",
    admins: result.data,
    ...result.pagination,
  });
});

exports.getSingleTeacher = catchAsyncError(async (req, res, next) => {
  const teacherID = req.params.teacherID;
  const teacher = await Teacher.findById(teacherID);
  if (!teacher) {
    return next(new ErrorHandler("Teacher Not Found", 404));
  }
  res.status(201).json({
    status: "success",
    message: "Teacher fetched succesfully",
    data: teacher,
  });
});

exports.getTeacherProfile = catchAsyncError(async (req, res, next) => {
  const teacher = await Teacher.findById(req.user?._id).select(
    "-password -createdAt -updatedAt",
  );
  if (!teacher) {
    return next(new ErrorHandler("Teacher Not Found", 404));
  }
  res.status(201).json({
    status: "success",
    message: "Teacher Profile fetched succesfully",
    data: teacher,
  });
});

//Update/change the password => /api/v1/password/update
exports.teacherUpdatePassword = catchAsyncError(async (req, res, next) => {
  const teacher = await Teacher.findById(req.user.id).select("+password");
  //check previous password.
  const isPasswordMatched = await teacher.verifyPassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }
  teacher.password = req.body.password;
  await teacher.save();
  sendToken(teacher, 200, res);
});

exports.teacherUpdateProfile = catchAsyncError(async (req, res, next) => {
  const allowedFields = ["name", "email"];
  const teacherData = pickFields(req.body, allowedFields);

  const teacher = await Teacher.findByIdAndUpdate(req.user._id, teacherData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: teacher,
    message: "Teacher updated succesfully",
  });
});

exports.adminUpdateTeacher = catchAsyncError(async (req, res, next) => {
  const {
    programs,
    classLevel,
    academicYear,
    subject,
    isSuspended,
    isWithdrawn,
  } = req.body;
  //if email is taken.
  const teacherExist = await Teacher.findById(req.params.teacherID);
  if (!teacherExist) {
    return next(new ErrorHandler("Teacher Not Found", 404));
  }
  await Teacher.findByIdAndUpdate(
    req.params.teacherID,
    {
      $set: {
        isWithdrawn,
        isSuspended,
      },
    },
    {
      new: true,
    },
  );
  //if teacher is withdrawn.
  if (teacherExist.isWithdrawn) {
    return next(new ErrorHandler("Action denied, teacher is withdraw", 403));
  }
  const teacherUpdated = await Teacher.findByIdAndUpdate(
    req.params.teacherID,
    {
      $set: {
        subject,
        academicYear,
        programs,
      },
      $addToSet: {
        classLevel,
      },
    },
    {
      new: true,
    },
  );
  res.status(200).json({
    success: true,
    data: teacherUpdated,
    message: "Teacher updated successfully",
  });
});
