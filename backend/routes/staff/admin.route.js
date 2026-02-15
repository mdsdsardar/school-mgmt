const express = require("express");
const {
  registerAdmCtrl,
  loginAdminCtr,
  getAdminsCtr,
  getAdminProfileCtr,
  deleteAdminCtr,
  adminUpdateTeacher,
  updatePassword,
  updateProfileCtr,
  logOut,
  getProfile,
} = require("../../controller/staff/admin.controller");
const Admin = require("../../model/Staff/admin.model");
const { isAuth, roleRestriction } = require("../../middlewares/isAuth");
const adminRouter = express.Router();

//register.
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtr);
adminRouter.get("/logout", logOut);
adminRouter.get("/me", getProfile);

adminRouter.get("/", isAuth(Admin), getAdminsCtr);

//single
adminRouter.get(
  "/profile",
  isAuth(Admin),
  roleRestriction("admin"),
  getAdminProfileCtr,
);

//update.
adminRouter.put(
  "/update/password",
  isAuth(Admin),
  roleRestriction("admin"),
  updatePassword,
);

adminRouter.put(
  "/profile/update",
  isAuth(Admin),
  roleRestriction("admin"),
  updateProfileCtr,
);

//delete.
// adminRouter.delete("/:id", deleteAdminCtr);

//suspend.
adminRouter.put(
  "/update/teacher/:teacherID",
  isAuth(Admin),
  roleRestriction("admin"),
  adminUpdateTeacher,
);

module.exports = adminRouter;
