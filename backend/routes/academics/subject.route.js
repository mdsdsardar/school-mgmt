const express = require("express");
const {
  createSubject,
  getSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubjects,
} = require("../../controller/academics/subjects.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Admin = require("../../model/Staff/admin.model");

const subjectRouter = express.Router();

subjectRouter.post(
  "/:programID",
  isAuth(Admin),
  roleRestriction("admin"),
  createSubject,
);
subjectRouter.get("/", getSubjects);

subjectRouter
  .route("/:id")
  .get(getSingleSubject)
  .put(isAuth(Admin), roleRestriction("admin"), updateSubject)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteSubjects);

module.exports = subjectRouter;
