const APIFeatures = require("../../middlewares/advanceResults");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const ClassLevel = require("../../model/Acedemic/classLevel.model");
const Admin = require("../../model/Staff/admin.model");

exports.createClassLevel = catchAsyncError(async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return next(new ErrorHandler("Please enter name & description", 400));
  }
  //check if exists.
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    return next(new ErrorHandler("Class already exists", 400));
  }
  //create.
  const classCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.user._id,
  });
  //Push class into admin.
  const admin = await Admin.findById(req.user._id);
  admin.classLevels.push(classCreated._id);
  await admin.save();
  res.status(201).json({
    success: true,
    message: "Class created successfully",
    data: classCreated,
  });
});

exports.getClassLevels = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const classes = await new APIFeatures(ClassLevel.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    status: "success",
    message: "Class level fetched successfully",
    data: classes.data,
    ...classes.pagination,
  });
});

exports.getSingleClassLevel = catchAsyncError(async (req, res, next) => {
  const classLevel = await ClassLevel.findById(req.params.id).populate(
    "createdBy",
  );
  res.status(201).json({
    status: "success",
    message: "Class fetched successfully",
    data: classLevel,
  });
});

exports.updateClassLevel = catchAsyncError(async (req, res, next) => {
  const { name, description } = req.body; //fetch those which are req. for checking.
  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      // createdBy: req.user._id,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "Class Level updated successfully",
    data: classLevel,
  });
});

exports.deleteClassLevel = catchAsyncError(async (req, res, next) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Class deleted successfully",
  });
});
