const APIFeatures = require("../../middlewares/advanceResults");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const AcademicYear = require("../../model/Acedemic/academicYear.model");
const Admin = require("../../model/Staff/admin.model");
const ErrorHandler = require("../../utils/errorHandler");

exports.createAcademicYear = catchAsyncError(async (req, res, next) => {
  const { name, fromYear, toYear } = req.body;
  if (!name || !fromYear || !toYear) {
    return next(
      new ErrorHandler("Please enter name, description & duration", 400),
    );
  }
  //check if exists.
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    return next(new ErrorHandler("Academic year already exists", 400));
  }
  //create.
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.user._id,
  });
  //Push academic year into admin.
  const admin = await Admin.findById(req.user._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();
  res.status(201).json({
    success: true,
    message: "Academic year created successfully",
    data: academicYearCreated,
  });
});

exports.getAcademicYears = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 2;
  const academicYears = await new APIFeatures(AcademicYear.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears.data,
    ...academicYears.pagination,
  });
});

exports.getSingleAcademicYears = catchAsyncError(async (req, res, next) => {
  const academicYears = await AcademicYear.findById(req.params.id).populate(
    "createdBy",
  );
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

exports.updateAcademicYear = catchAsyncError(async (req, res, next) => {
  const { name, fromYear, toYear, isCurrent } = req.body;
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      isCurrent,
      // createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Academic years updated successfully",
    data: academicYear,
  });
});

exports.deleteAcademicYear = catchAsyncError(async (req, res, next) => {
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Academic years deleted successfully",
  });
});
