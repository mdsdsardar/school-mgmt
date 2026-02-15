import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../../shared/metaData";
import Loader from "../../shared/loader";
import { getAuth } from "../../../slices/auth.slice";

const TeacherLogin = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  // const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  useEffect(() => {
    if (isAuthenticated) {
      // navigate(redirect, { replace: true });
      navigate("/dashboard");
    }
    // Dispatch the async thunk to fetch products
    if (error) {
      toast.error(error); // 🔥 replacement
      return;
    }
  }, [navigate, isAuthenticated, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    dispatch(getAuth({ formData, url: "teachers" }));
  };
  // Option 2: Separate handlers (no name attribute needed)
  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login As Teacher"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login As Teacher</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="text-center py-2">
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-2"
                  >
                    LOGIN
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/login" className="d-block py-2">
                    <i className="fa fa-user"></i> Login As Student?
                  </Link>
                  <Link to="/admin/login" className="d-block">
                    <i className="fa fa-user"></i> Login As Admin?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeacherLogin;
