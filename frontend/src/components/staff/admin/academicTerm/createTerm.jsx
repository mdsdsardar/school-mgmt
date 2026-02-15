import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearisCreated,
  createAcademicTerm,
} from "../../../../slices/academic.slice";
import MetaData from "../../../shared/metaData";

const CreateAcademicTerm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // ← Date as string
  const [duration, setDuration] = useState(""); // ← Date as string

  const { loading, error, isCreated } = useSelector((state) => state.academic);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Academic Term Created Succesfully!");
      navigate("/admin/all/academic-term");
      dispatch(clearisCreated());
    }
  }, [dispatch, isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("duration", duration);
    dispatch(createAcademicTerm(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Create Academic Term"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Academic Term</h1>
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
            <div className="form-group">
              <label htmlFor="email_field">Duration</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
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

export default CreateAcademicTerm;
