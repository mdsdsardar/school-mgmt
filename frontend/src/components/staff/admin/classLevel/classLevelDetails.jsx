import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  classLevelDetails,
  clearError,
  clearisUpdated,
  updateClassLevel,
} from "../../../../slices/tech.slice";

const ClassLevelDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, classLevel, isUpdated } = useSelector(
    (state) => state.tech,
  );
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");

  useEffect(() => {
    dispatch(classLevelDetails(id));
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (classLevel) {
      setName(classLevel.name || "");
      setDescripion(classLevel.description || "");
    }
  }, [classLevel]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Class Level updated successfully");
      navigate("/admin/all/classLevel");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    dispatch(updateClassLevel({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            Edit Class Level
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
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
              <label className="form-label">Description</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="description"
                value={description}
                onChange={(e) => setDescripion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {classLevel?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Class Level"}
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ClassLevelDetails;
