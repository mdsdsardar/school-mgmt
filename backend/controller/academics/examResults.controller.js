const APIFeatures = require("../../middlewares/advanceResults");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const ExamResult = require("../../model/Acedemic/examResults.model");
const Student = require("../../model/Acedemic/student.model");
const ErrorHandler = require("../../utils/errorHandler");

exports.checkExamResult = catchAsyncError(async (req, res, next) => {
  const examResult = await ExamResult.findOne({
    _id: req.params.id,
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");
  // //check if exam result is published.
  // if (examResult?.isPublished === false) {
  //   return next(
  //     new ErrorHandler(
  //       "Exam result is not Available, please check later.",
  //       400,
  //     ),
  //   );
  // }
  res.status(201).json({
    status: "success",
    message: "Exam Results",
    data: examResult,
  });
});

exports.getAllExamResult = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const results = await new APIFeatures(
    ExamResult.find().populate("exam").populate("academicTerm"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute();

  // const results = await ExamResult.find().select("exam").populate("exam");
  res.status(201).json({
    status: "success",
    message: "Exam Results fetched successfully",
    data: results.data,
    ...results.pagination,
  });
});

exports.getExamResultForStudent = catchAsyncError(async (req, res, next) => {
  const studentFound = await Student.findById(req.user?._id);
  if (!studentFound) {
    return next(new ErrorHandler("No Student Found.", 400));
  }
  // exams already taken (only published results)
  // const takenExams = await ExamResult.find({
  //   studentID: studentFound.studentId,
  //   isPublished: true, // ensure result is published
  // }).select("exam");
  const resPerPage = Number(req.query.limit) || 5;
  const results = await new APIFeatures(
    ExamResult.find({
      studentID: studentFound.studentId,
      isPublished: true, // ensure result is published
    })
      .populate("exam")
      .populate("academicTerm"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute();

  // const results = await ExamResult.find().select("exam").populate("exam");
  res.status(201).json({
    status: "success",
    message: "Exam Results fetched successfully",
    data: results.data,
    ...results.pagination,
  });
});

exports.adminPublishExamResults = catchAsyncError(async (req, res, next) => {
  const examResult = await ExamResult.findById(req.params.id);
  if (!examResult) {
    return next(new ErrorHandler("Exam result not Found.", 400));
  }
  const publishResult = await ExamResult.findByIdAndUpdate(
    req.params.id,
    {
      isPublished: req.body.publish,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Exam Results Updated successfully",
    data: publishResult,
  });
});
