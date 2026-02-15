import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../shared/metaData";
import {
  clearError,
  clearisCreated,
  createClassLevel,
  createProgram,
} from "../../../../slices/tech.slice";

const CreateClassLevel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error, isCreated } = useSelector((state) => state.tech);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Class Level Created Succesfully!");
      navigate("/admin/all/classLevel");
      dispatch(clearisCreated());
    }
  }, [dispatch, isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    dispatch(createClassLevel(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Create Class Level"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Class Level</h1>
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

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREATE CLASS LEVEL
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateClassLevel;
