const express = require("express");
const {
  deleteProgram,
  updateProgram,
  getSingleprogram,
  getProgram,
  createProgram,
} = require("../../controller/academics/Program.controller");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const Admin = require("../../model/Staff/admin.model");

const programRouter = express.Router();

programRouter
  .route("/")
  .post(isAuth(Admin), roleRestriction("admin"), createProgram)
  // .get(isAuth(Admin), roleRestriction("admin"), getProgram);
  .get(getProgram);

programRouter
  .route("/:id")
  // .get(isAuth(Admin), roleRestriction("admin"), getSingleprogram)
  .get(getSingleprogram)
  .put(isAuth(Admin), roleRestriction("admin"), updateProgram)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteProgram);

module.exports = programRouter;
