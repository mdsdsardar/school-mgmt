const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const Program = require("../../model/Acedemic/program.model");
const Admin = require("../../model/Staff/admin.model");
const APIFeatures = require("../../middlewares/advanceResults");

exports.createProgram = catchAsyncError(async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return next(new ErrorHandler("Please enter name & description", 400));
  }
  //check if exists.
  const programFound = await Program.findOne({ name });
  if (programFound) {
    return next(new ErrorHandler("Program already exists", 400));
  }
  //create.
  const programCreated = await Program.create({
    name,
    description,
    createdBy: req.user._id,
  });
  //Push program into admin.
  const admin = await Admin.findById(req.user._id);
  admin.programs.push(programCreated._id);
  await admin.save();
  res.status(201).json({
    success: true,
    message: "programs created successfully",
    data: programCreated,
  });
});

exports.getProgram = catchAsyncError(async (req, res, next) => {
  const resPerPage = Number(req.query.limit) || 5;
  const programs = await new APIFeatures(Program.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(201).json({
    status: "success",
    message: "programs fetched successfully",
    data: programs.data,
    ...programs.pagination,
  });
});

exports.getSingleprogram = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id).populate("createdBy");
  res.status(201).json({
    success: true,
    message: "program fetched successfully",
    data: program,
  });
});

exports.updateProgram = catchAsyncError(async (req, res, next) => {
  const { name, description } = req.body;
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      // createdBy: req.user._id,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    success: true,
    message: "program updated successfully",
    data: program,
  });
});

exports.deleteProgram = catchAsyncError(async (req, res, next) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "Program deleted successfully",
  });
});
