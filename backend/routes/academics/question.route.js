const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestions,
  deleteQuestion,
} = require("../../controller/academics/questions.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Teacher = require("../../model/Staff/teacher.model");

const questionRouter = express.Router();

questionRouter.post(
  "/:examID",
  isAuth(Teacher),
  roleRestriction("teacher"),
  createQuestion,
);
questionRouter.get(
  "/",
  isAuth(Teacher),
  roleRestriction("teacher"),
  getAllQuestions,
);
questionRouter.get(
  "/:id",
  isAuth(Teacher),
  roleRestriction("teacher"),
  getSingleQuestion,
);
questionRouter.put(
  "/:id",
  isAuth(Teacher),
  roleRestriction("teacher"),
  updateQuestions,
);
questionRouter.delete(
  "/:id",
  isAuth(Teacher),
  roleRestriction("teacher"),
  deleteQuestion,
);

module.exports = questionRouter;
