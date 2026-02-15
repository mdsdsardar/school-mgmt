const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachers,
  getSingleTeacher,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
  teacherUpdatePassword,
} = require("../../controller/staff/teacher.controller");
const Teacher = require("../../model/Staff/teacher.model");
const Admin = require("../../model/Staff/admin.model");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");

const teacherRouter = express.Router();

teacherRouter.post(
  "/admin/register",
  isAuth(Admin),
  roleRestriction("admin"),
  adminRegisterTeacher,
);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isAuth(Admin), getAllTeachers);
teacherRouter.get(
  "/profile",
  isAuth(Teacher),
  roleRestriction("teacher"),
  getTeacherProfile,
);
teacherRouter.put(
  "/update/password",
  isAuth(Teacher),
  roleRestriction("teacher"),
  teacherUpdatePassword,
);
teacherRouter.put(
  "/profile/update",
  isAuth(Teacher),
  roleRestriction("teacher"),
  teacherUpdateProfile,
);

//Keep all the id related route in last.
teacherRouter.get(
  "/:teacherID/admin",
  isAuth(Admin),
  roleRestriction("admin"),
  getSingleTeacher,
);
teacherRouter.put(
  "/:teacherID/update/admin",
  isAuth(Admin),
  roleRestriction("admin"),
  adminUpdateTeacher,
);

module.exports = teacherRouter;
