const express = require("express");
const {
  createYearGroup,
  deleteYearGroup,
  updateYearGroup,
  getSingleYearGroup,
  getYearGroup,
} = require("../../controller/academics/yearGroup.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Admin = require("../../model/Staff/admin.model");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .post(isAuth(Admin), roleRestriction("admin"), createYearGroup)
  .get(isAuth(Admin), roleRestriction("admin"), getYearGroup);

yearGroupRouter
  .route("/:id")
  .get(isAuth(Admin), roleRestriction("admin"), getSingleYearGroup)
  .put(isAuth(Admin), roleRestriction("admin"), updateYearGroup)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteYearGroup);

module.exports = yearGroupRouter;
