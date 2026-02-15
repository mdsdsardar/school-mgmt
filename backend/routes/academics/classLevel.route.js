const express = require("express");
const {
  deleteClassLevel,
  updateClassLevel,
  getSingleClassLevel,
  getClassLevels,
  createClassLevel,
} = require("../../controller/academics/classLvl.controller");
const Admin = require("../../model/Staff/admin.model");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");

const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isAuth(Admin), roleRestriction("admin"), createClassLevel)
  // .get(isAuth(Admin), roleRestriction("admin"), getClassLevels);
  .get(getClassLevels);

classLevelRouter
  .route("/:id")
  // .get(isAuth(Admin), roleRestriction("admin"), getSingleClassLevel)
  .get(getSingleClassLevel)
  .put(isAuth(Admin), roleRestriction("admin"), updateClassLevel)
  .delete(isAuth(Admin), roleRestriction("admin"), deleteClassLevel);

module.exports = classLevelRouter;
