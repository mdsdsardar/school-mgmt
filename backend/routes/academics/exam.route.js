const express = require("express");
const {
  createExam,
  getAllExam,
  getSingleExam,
  updateExam,
  deleteExam,
} = require("../../controller/academics/exams.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Teacher = require("../../model/Staff/teacher.model");

const examRouter = express.Router();

examRouter
  .route("/")
  .post(isAuth(Teacher), roleRestriction("teacher"), createExam);
examRouter
  .route("/")
  .get(isAuth(Teacher), roleRestriction("teacher"), getAllExam);
examRouter.route("/:id").get(getSingleExam);
examRouter
  .route("/:id")
  .put(isAuth(Teacher), roleRestriction("teacher"), updateExam);
examRouter
  .route("/:id")
  .delete(isAuth(Teacher), roleRestriction("teacher"), deleteExam);

module.exports = examRouter;
