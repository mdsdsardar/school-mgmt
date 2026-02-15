const Admin = require("../../model/Staff/admin.model");
const YearGroup = require("../../model/Acedemic/yearGroup.model");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const APIFeatures = require("../../middlewares/advanceResults");
const ErrorHandler = require("../../utils/errorHandler");

exports.createYearGroup = catchAsyncError(async (req, res, next) => {
  const { name, academicYear } = req.body;
  if (!name || !academicYear) {
    return next(new ErrorHandler("Please enter name & academicYear", 400));
  }
  //check if exists.
  const yearGroup = await YearGroup.findOne({ name });
  if (yearGroup) {
    return next(new ErrorHandler("YearGroup already exists", 400));
  }
  //create.
  const yearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.user._id,
  });
  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    return next(new ErrorHandler("Admin not found", 400));
  }
  admin.yearGroups.push(yearGroupCreated._id);
  await admin.save();
  res.status(201).json({
    success: true,
    message: "Year Group created successfully",
    data: yearGroupCreated,
  });
});

exports.getYearGroup = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const groups = await new APIFeatures(
    YearGroup.find().populate("academicYear"),
    req.query,
  )
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: groups.data,
    ...groups.pagination,
  });
});

exports.getSingleYearGroup = catchAsyncError(async (req, res, next) => {
  const group = await YearGroup.findById(req.params.id).populate("createdBy");
  res.status(201).json({
    status: "success",
    message: "Year Group fetched successfully",
    data: group,
  });
});

exports.updateYearGroup = catchAsyncError(async (req, res, next) => {
  const { name, academicYear } = req.body;
  //check if name exists.
  const groups = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      // createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Year Group updated successfully",
    data: groups,
  });
});

exports.deleteYearGroup = catchAsyncError(async (req, res, next) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "YearGroup deleted successfully",
  });
});
