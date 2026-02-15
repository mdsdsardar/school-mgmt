const express = require("express");
const {
  adminRegisterStudents,
  loginStudents,
  getStudentsProfile,
  getAllStudents,
  getStudentsByAdmin,
  studentUpdateProfile,
  adminUpdateStudents,
  writeExam,
  studentUpdatePassword,
  getAllExamForStudent,
} = require("../../controller/students/students.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Student = require("../../model/Acedemic/student.model");
const Admin = require("../../model/Staff/admin.model");

const studentRouter = express.Router();

studentRouter.post(
  "/admin/register",
  isAuth(Admin),
  roleRestriction("admin"),
  adminRegisterStudents,
);
studentRouter.post("/login", loginStudents);
studentRouter.get(
  "/admin",
  isAuth(Admin),
  roleRestriction("admin"),
  getAllStudents,
);
studentRouter.get(
  "/:studentID/admin",
  isAuth(Admin),
  roleRestriction("admin"),
  getStudentsByAdmin,
);
studentRouter.post(
  "/exam/:examID/write",
  isAuth(Student),
  roleRestriction("student"),
  writeExam,
);
studentRouter.get(
  "/profile",
  isAuth(Student),
  roleRestriction("student"),
  getStudentsProfile,
);
studentRouter.put(
  "/update/password",
  isAuth(Student),
  roleRestriction("student"),
  studentUpdatePassword,
);
studentRouter.put(
  "/profile/update",
  isAuth(Student),
  roleRestriction("student"),
  studentUpdateProfile,
);
studentRouter.put(
  "/:studentID/update/admin",
  isAuth(Admin),
  roleRestriction("admin"),
  adminUpdateStudents,
);

studentRouter.get(
    "/fetch/exam",
    isAuth(Student),
    roleRestriction("student"),
    getAllExamForStudent,
  );
module.exports = studentRouter;
