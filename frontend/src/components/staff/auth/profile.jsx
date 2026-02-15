import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/loader";
import MetaData from "../../shared/metaData";
import { loadUser, setLoading } from "../../../slices/auth.slice";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // // useEffect(() => {
  // //   // dispatch(setLoading(true));
  // //   dispatch(loadUser());
  // // }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your profile"} />
          <h2 className="mt-5 ml-5" style={{ textAlign: "center" }}>
            My Profile
          </h2>
          <div className="row justify-content-around mt-5 user-info">
            {/* <div className="col-12 col-md-3"> */}
            <Link
              to="/update/profile"
              id="edit_profile"
              className="btn btn-primary my-5 w-100"
              style={{ maxWidth: "10rem" }}
            >
              Edit Profile
            </Link>
            {/* </div> */}

            {/* <div className="col-12 col-md-5"> */}
            <div style={{ textAlign: "center" }}>
              <h4>Full Name</h4>
              <p>{user?.name}</p>

              <h4>Email Address</h4>
              <p>{user?.email}</p>
            </div>
            <Link
              to="/update/password"
              className="btn btn-primary mt-3 w-100"
              style={{ maxWidth: "10rem" }}
            >
              Change Password
            </Link>
          </div>
          {/* </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
