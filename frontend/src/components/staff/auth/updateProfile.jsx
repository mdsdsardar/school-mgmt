import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  loadUser,
  updateProfile,
  updateUserReset,
} from "../../../slices/auth.slice";
import MetaData from "../../shared/metaData";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { user, error, isUpdated, loading } = useSelector(
    (state) => state.auth,
  );
  const userType = user?.role;
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    // Dispatch the async thunk to fetch products
    if (error) {
      toast.error(error); // 🔥 replacement
      dispatch(clearError());
      return;
    }
    if (isUpdated) {
      toast.success("User updated successfully"); // 🔥 replacement
      dispatch(loadUser());
      navigate("/profile");
      dispatch(updateUserReset()); // ✅ Reset after navigation
    }
  }, [dispatch, error, navigate, isUpdated]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    dispatch(updateProfile({ formData, userType }));
  };
  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
