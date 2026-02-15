const express = require("express");
const {
  createAcademicTerm,
  getAcademicTerms,
  getSingleAcademicTerms,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controller/academics/academicTerm.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Admin = require("../../model/Staff/admin.model");

const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isAuth(Admin), roleRestriction("admin"), createAcademicTerm)
  // .get(isAuth(Admin), roleRestriction("admin"), getAcademicTerms);
  .get(getAcademicTerms);

academicTermRouter
  .route("/:id")
  // .get(isAuth(Admin), roleRestriction("admin"), getSingleAcademicTerms)
  .get(getSingleAcademicTerms)
  .put(isAuth(Admin), roleRestriction("admin"), updateAcademicTerm)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteAcademicTerm);

module.exports = academicTermRouter;
