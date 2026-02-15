const express = require("express");
const {
  createAcademicYear,
  getAcademicYears,
  getSingleAcademicYears,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academics/academicYear.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Admin = require("../../model/Staff/admin.model");

const academicYearRouter = express.Router();

academicYearRouter
  .route("/")
  .post(isAuth(Admin), roleRestriction("admin"), createAcademicYear)
  // .get(isAuth(Admin), roleRestriction("admin"), getAcademicYears);
  .get(getAcademicYears);

academicYearRouter
  .route("/:id")
  // .get(isAuth(Admin), roleRestriction("admin"), getSingleAcademicYears)
  .get(getSingleAcademicYears)
  .put(isAuth(Admin), roleRestriction("admin"), updateAcademicYear)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteAcademicYear);

module.exports = academicYearRouter;
