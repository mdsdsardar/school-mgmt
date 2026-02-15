import { Fragment } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import MetaData from "../../shared/metaData";
import Loader from "../../shared/loader";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="row container container-fluid">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9">
            <h1 className="my-4">Dashboard</h1>
            <Fragment>
              <MetaData title={"Dashboard"} />
              {isAuthenticated && user?.role === "admin" ? (
                <div className="row pr-4">
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>All Teachers</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin/all/teachers"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>All Students </b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin/all/students"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>All Subject</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin/all/subjects"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
              {isAuthenticated && user?.role === "teacher" ? (
                <div className="row pr-4">
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>Exam</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin/create/exam"
                      >
                        <span className="float-left">Create Exam</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>Question</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/teacher/create/question"
                      >
                        <span className="float-left">Create Question</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>All Exams</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin/all/exam"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>All Questions</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/teacher/all/question"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
              {isAuthenticated && user?.role === "student" ? (
                <div className="row pr-4">
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>Exam</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/student/list/exam"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b>Exam Result </b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/student/list/exam-result"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <b> Profile </b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/profile"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
            {/* // )} */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
