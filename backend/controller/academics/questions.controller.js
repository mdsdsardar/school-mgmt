const APIFeatures = require("../../middlewares/advanceResults");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const Exam = require("../../model/Acedemic/exam.model");
const Question = require("../../model/Acedemic/questions.model");
const ErrorHandler = require("../../utils/errorHandler");

exports.createQuestion = catchAsyncError(async (req, res, next) => {
  const { questions, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    return next(new ErrorHandler("Exam not Found", 404));
  }
  const questionExists = await Question.findOne({ questions });
  if (questionExists) {
    return next(new ErrorHandler("Question Already Exists", 401));
  }
  const questionCreated = await Question.create({
    questions,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.user._id,
  });
  examFound.questions.push(questionCreated?._id);
  await examFound.save();
  res.status(201).json({
    success: true,
    data: questionCreated,
    message: "Question created succesfully",
  });
});

exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const questions = await new APIFeatures(Question.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    success: true,
    message: "Question fetched successfully",
    data: questions.data,
    ...questions.pagination,
  });
});

exports.getSingleQuestion = catchAsyncError(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate("createdBy");
  res.status(201).json({
    success: true,
    message: "Question fetched successfully",
    data: question,
  });
});

exports.updateQuestions = catchAsyncError(async (req, res, next) => {
  const { questions, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  const questionUpdated = await Question.findByIdAndUpdate(
    req.params.id,
    {
      questions,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Question updated successfully",
    data: questionUpdated,
  });
});

exports.deleteQuestion = catchAsyncError(async (req, res, next) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Question Deleted successfully",
  });
});
