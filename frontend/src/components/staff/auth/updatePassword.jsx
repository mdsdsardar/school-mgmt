import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  updatePassword,
  updateUserReset,
} from "../../../slices/auth.slice";
import MetaData from "../../shared/metaData";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const { error, isUpdated, loading, user } = useSelector(
    (state) => state.auth,
  );
  const userType = user?.role; // Get role from logged-in user
  useEffect(() => {
    // Dispatch the async thunk to fetch products
    if (error) {
      toast.error(error); // 🔥 replacement
      dispatch(clearError());
      return;
    }
    if (isUpdated) {
      toast.success("Password updated successfully"); // 🔥 replacement
      navigate("/profile");
      dispatch(updateUserReset()); // ✅ Reset after navigation
    }
  }, [dispatch, error, isUpdated, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword({ formData, userType }));
  };
  return (
    <Fragment>
      <MetaData title={"Change Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
