const Admin = require("../../model/Staff/admin.model");
const Teacher = require("../../model/Staff/teacher.model");
const { catchAsyncError } = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorHandler");
const sendToken = require("../../utils/generateToken");
const APIFeatures = require("../../middlewares/advanceResults");
const { pickFields } = require("../../utils/filteredMW");
const jwt = require("jsonwebtoken");
const Student = require("../../model/Acedemic/student.model");

//@desc register admins
//@route POST /api/v1/admins/register
//@access Private
exports.registerAdmCtrl = catchAsyncError(async (req, res, next) => {
  //Check if email already exists
  const adminFound = await Admin.findOne({ email: req.body.email });
  if (adminFound) {
    return next(new ErrorHandler("Admin already exists.", 409));
  }
  const allowedFields = ["name", "email", "password"];
  const adminData = pickFields(req.body, allowedFields);
  const user = new Admin(adminData);
  await user.save();
  // sendToken(user, 200, res);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

//Login admin.
exports.loginAdminCtr = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  //Check if email already exists
  const user = await Admin.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Login Credentials.", 401));
  }
  //verfiy password
  const isPasswordMatched = await user.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Login Credentials.", 401));
  }
  sendToken(user, 200, res);
  // res.status(200).json({
  //   status: "success",
  //   data: user,
  // });
});

//get all admin.
exports.getAdminsCtr = catchAsyncError(async (req, res) => {
  const resPerPage = Number(req.query.limit) || 5;
  const result = await new APIFeatures(Admin.find(), req.query)
    .search()
    .pagination(resPerPage)
    .execute(); // Single await, handles everything
  res.status(200).json({
    success: true,
    message: "Sucesfully fetched all product from DB.",
    admins: result.data,
    ...result.pagination,
  });
});

exports.getAdminProfileCtr = catchAsyncError(async (req, res, next) => {
  const admin = await Admin.findById(req.user._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("teachers")
    .populate("students");
  if (!admin) {
    return next(new ErrorHandler("Admin not found.", 404));
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
    });
  }
});

//Update/change the password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await Admin.findById(req.user.id).select("+password");
  //check previous password.
  const isPasswordMatched = await user.verifyPassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfileCtr = catchAsyncError(async (req, res, next) => {
  const allowedFields = ["name", "email"];
  const adminData = pickFields(req.body, allowedFields);
  const admin = await Admin.findByIdAndUpdate(req.user._id, adminData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: admin,
    message: "Admin updated succesfully",
  });
});

// exports.deleteAdminCtr = (req, res, next) => {
//   try {
//     res.status(201).json({
//       status: "success",
//       data: "Delete admin",
//     });
//   } catch (error) {
//     res.json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };

exports.adminUpdateTeacher = catchAsyncError(async (req, res, next) => {
  const { isSuspended, isWithdrawn } = req.body;
  //if email is taken.
  const teacherExist = await Teacher.findById(req.params.teacherID);
  if (!teacherExist) {
    return next(new ErrorHandler("Teacher Not Found.", 404));
  }
  const teacher = await Teacher.findByIdAndUpdate(
    req.params.teacherID,
    {
      isSuspended,
      isWithdrawn,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  // await teacherExist.save();
  res.status(200).json({
    status: "success",
    data: teacher,
    message: "Teacher updated succesfully",
  });
});

//Logout user => /api/v1/logout
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// controllers/authController.js
exports.getProfile = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id, model } = decoded;

  const models = {
    Admin,
    Teacher,
    Student,
  };

  const UserModel = models[model];
  if (!UserModel) {
    return next(new ErrorHandler("Invalid user model.", 400));
  }

  const user = await UserModel.findById(id).select("name email role");

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
