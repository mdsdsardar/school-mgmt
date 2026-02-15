import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearisCreated,
  createAcademicYear,
} from "../../../../slices/academic.slice";
import MetaData from "../../../shared/metaData";

const CreateAcademicYear = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [fromYear, setFromYear] = useState(""); // ← Date as string
  const [toYear, setToYear] = useState(""); // ← Date as string

  const { loading, error, isCreated } = useSelector((state) => state.academic);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Academic Year Created Succesfully!");
      navigate("/admin/all/academic-year");
      dispatch(clearisCreated());
    }
  }, [dispatch, isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("fromYear", fromYear);
    formData.set("toYear", toYear);
    dispatch(createAcademicYear(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Create Academic Year"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Academic Year</h1>

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
            <div className="mb-3">
              <label className="form-label">From Year</label>
              <input
                type="date"
                id="from_year_field"
                className="form-control"
                name="fromYear"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">To Year</label>
              <input
                type="date"
                id="to_year_field"
                className="form-control"
                name="toYear"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                required
              />
            </div>
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREATE ACADEMIC YEAR
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateAcademicYear;
