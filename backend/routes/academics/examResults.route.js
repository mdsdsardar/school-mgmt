const express = require("express");
const {
  checkExamResult,
  getAllExamResult,
  adminPublishExamResults,
  getExamResultForStudent,
} = require("../../controller/academics/examResults.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Student = require("../../model/Acedemic/student.model");
const Admin = require("../../model/Staff/admin.model");

const examResultsRouter = express.Router();

examResultsRouter.get(
  "/:id/checking",
  // isAuth(Student),
  // roleRestriction("student"),
  checkExamResult,
);
// examResultsRouter.get(
//   "/:id/admin/checking",
//   isAuth(Admin),
//   roleRestriction("admin"),
//   checkExamResultForAdmin,
// );
examResultsRouter.get(
  "/",
  isAuth(Admin),
  roleRestriction("admin"),
  getAllExamResult,
);
examResultsRouter.get(
  "/student",
  isAuth(Student),
  roleRestriction("student"),
  getExamResultForStudent,
);
examResultsRouter.put(
  "/:id/admin-toggle-publish",
  isAuth(Admin),
  roleRestriction("admin"),
  adminPublishExamResults,
);

module.exports = examResultsRouter;
