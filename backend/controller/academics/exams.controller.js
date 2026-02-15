const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const { filterBodyBySchema } = require("../../utils/filteredMW");
const Exam = require("../../model/Acedemic/exam.model");
const Teacher = require("../../model/Staff/teacher.model");
const ErrorHandler = require("../../utils/errorHandler");
const APIFeatures = require("../../middlewares/advanceResults");

exports.createExam = catchAsyncError(async (req, res, next) => {
  teacherFound = await Teacher.findById(req.user._id);
  if (!teacherFound) {
    return next(new ErrorHandler("Teacher not found", 400));
  }
  //exam exists.
  const examExists = await Exam.findOne({ name: req.body.name });
  if (examExists) {
    return next(new ErrorHandler("Exam already exists", 400));
  }
  const filteredData = filterBodyBySchema(req.body, Exam);
  filteredData.createdBy = req.user._id;

  const examCreated = new Exam(filteredData);
  await examCreated.save();

  teacherFound.examsCreated.push(examCreated._id);
  await teacherFound.save();

  res.status(201).json({
    success: true,
    message: "Exam Created successfully",
    data: examCreated,
  });
});

exports.getAllExam = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 2;
  const exams = await new APIFeatures(
    Exam.find()
      .populate({
        path: "questions",
        populate: {
          path: "createdBy",
        },
      })
      .populate("subject")
      .populate("academicTerm"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute();
  res.status(201).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams.data,
    ...exams.pagination,
  });
});

exports.getSingleExam = catchAsyncError(async (req, res, next) => {
  const exam = await Exam.findById(req.params.id)
    .populate("questions")
    .populate("createdBy")
    .populate("subject")
    .populate("academicTerm");
  res.status(201).json({
    success: true,
    message: "Exam fetched successfully",
    data: exam,
  });
});

exports.updateExam = catchAsyncError(async (req, res, next) => {
  const filteredData = filterBodyBySchema(req.body, Exam);
  const { questions, ...dataWithoutQuestions } = filteredData;
  const examUpdated = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...dataWithoutQuestions,
      },
      $addToSet: {
        questions: questions,
      },
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Exam updated successfully",
    data: examUpdated,
  });
});

exports.deleteExam = catchAsyncError(async (req, res, next) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Exam deleted successfully",
  });
});
