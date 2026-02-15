import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../shared/metaData";
import {
  allPrograms,
  clearError,
  clearisCreated,
  createProgram,
  createSubject,
} from "../../../../slices/tech.slice";
import {
  allAcademicTerm,
  allAcademicYears,
} from "../../../../slices/academic.slice";

const CreateSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [program, setProgram] = useState(""); // ← New field
  const [academicTerm, setAcademicTerm] = useState("");
  const { loading, error, isCreated, allProgram } = useSelector(
    (state) => state.tech,
  );
  const { allTerm } = useSelector((state) => state.academic);
  useEffect(() => {
    dispatch(allPrograms()); // ← Fetch programs
    dispatch(allAcademicTerm());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Subject Created Succesfully!");
      navigate("/admin/all/subjects");
      dispatch(clearisCreated());
    }
  }, [isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("academicTerm", academicTerm);
    dispatch(createSubject({ formData, program }));
  };
  return (
    <Fragment>
      <MetaData title={"Create Program"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Program</h1>
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
              <label htmlFor="email_field">Description</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Program</label>
              <select
                className="form-select"
                name="program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="">Select Program</option>
                {allProgram?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Academic Term</label>
              <select
                className="form-select"
                name="academicTerm"
                value={academicTerm}
                onChange={(e) => setAcademicTerm(e.target.value)}
              >
                <option value="">Select Academic Term</option>
                {allTerm?.map((y) => (
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
              CREATE SUBJECT
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateSubject;
