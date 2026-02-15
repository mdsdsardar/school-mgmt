const Subject = require("../../model/Acedemic/subject.model");
const Admin = require("../../model/Staff/admin.model");
const Program = require("../../model/Acedemic/program.model");
const ErrorHandler = require("../../utils/errorHandler");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const APIFeatures = require("../../middlewares/advanceResults");

exports.createSubject = catchAsyncError(async (req, res, next) => {
  const { name, description, academicTerm } = req.body;
  if (!name || !description || !academicTerm) {
    return next(
      new ErrorHandler("Please enter name, description & academicTerm", 400),
    );
  }
  //find the program.
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) {
    return next(new ErrorHandler("Program Not Found", 400));
  }
  //check if exists.
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    return next(new ErrorHandler("Subject already exists", 400));
  }
  //create.
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.user._id,
  });
  //Push program into Subjects.
  programFound.subjects.push(subjectCreated._id);
  await programFound.save();
  res.status(201).json({
    success: true,
    message: "Subjects created successfully",
    data: subjectCreated,
  });
});

exports.getSubjects = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const subjects = await new APIFeatures(
    Subject.find().populate("academicTerm"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    status: "success",
    message: "subjects fetched successfully",
    data: subjects.data,
    ...subjects.pagination,
  });
});

exports.getSingleSubject = catchAsyncError(async (req, res, next) => {
  const subjects = await Subject.findById(req.params.id).populate("createdBy");
  res.status(201).json({
    status: "success",
    message: "subjects fetched successfully",
    data: subjects,
  });
});

exports.updateSubject = catchAsyncError(async (req, res, next) => {
  const { name, description, academicTerm, duration } = req.body;
  //check if name exists.
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      duration,
      // createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "subject updated successfully",
    data: subject,
  });
});

exports.deleteSubjects = catchAsyncError(async (req, res, next) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Subject deleted successfully",
  });
});
