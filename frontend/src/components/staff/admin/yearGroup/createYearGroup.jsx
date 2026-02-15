import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  allAcademicYears,
  clearError,
  clearisCreated,
  createAcademicTerm,
  createYearGroup,
} from "../../../../slices/academic.slice";
import MetaData from "../../../shared/metaData";

const CreateYearGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [academicYears, setAcademicYears] = useState("");

  const { loading, error, isCreated, allAcademicYear } = useSelector(
    (state) => state.academic,
  );
  useEffect(() => {
    dispatch(allAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Year Group Created Succesfully!");
      navigate("/admin/all/year-group");
      dispatch(clearisCreated());
    }
  }, [isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("academicYear", academicYears);
    dispatch(createYearGroup(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Create Year Group"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Year Group</h1>
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
              <label className="form-label">Academic Year</label>
              <select
                className="form-select"
                name="academicYear"
                value={academicYears}
                onChange={(e) => setAcademicYears(e.target.value)}
              >
                <option value="">Select Academic Year</option>
                {allAcademicYear?.map((y) => (
                  <option key={y._id} value={y._id}>
                    {y.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREATE ACADEMIC TERM
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateYearGroup;
