const AcademicTerm = require("../../model/Acedemic/academicTerm.model");
const Admin = require("../../model/Staff/admin.model");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorHandler");
const APIFeatures = require("../../middlewares/advanceResults");

exports.createAcademicTerm = catchAsyncError(async (req, res, next) => {
  const { name, description, duration } = req.body;
  if (!name || !description || !duration) {
    return next(
      new ErrorHandler("Please enter name, description & duration", 400),
    );
  }
  //check if exists.
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    return next(new ErrorHandler("Academic term already exists", 400));
  }
  //create.
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.user._id,
  });
  //Push academic term into admin.
  const admin = await Admin.findById(req.user._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();
  res.status(201).json({
    success: true,
    message: "Academic term created successfully",
    data: academicTermCreated,
  });
});

exports.getAcademicTerms = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const academicTerms = await new APIFeatures(AcademicTerm.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything

  res.status(201).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms.data,
    ...academicTerms.pagination,
  });
});

exports.getSingleAcademicTerms = catchAsyncError(async (req, res, next) => {
  const academicTerms = await AcademicTerm.findById(req.params.id).populate("createdBy");
  res.status(201).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms,
  });
});

exports.updateAcademicTerm = catchAsyncError(async (req, res, next) => {
  const { name, description, duration } = req.body;
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      // createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Academic terms updated successfully",
    data: academicTerm,
  });
});

exports.deleteAcademicTerm = catchAsyncError(async (req, res, next) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Academic terms deleted successfully",
  });
});
