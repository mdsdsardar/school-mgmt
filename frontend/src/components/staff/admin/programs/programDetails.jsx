import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearisUpdated,
  programDetails,
  updateProgram,
} from "../../../../slices/tech.slice";

const ProgramDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, program, isUpdated, allAcademicYear } = useSelector(
    (state) => state.tech,
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    dispatch(programDetails(id));
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (program) {
      setName(program.name || "");
      setDescription(program.description || "");
      setDuration(program.duration || "");
    }
  }, [program]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Program updated successfully");
      navigate("/admin/all/program");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("duration", duration);
    dispatch(updateProgram({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Edit Program</div>

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
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {program?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Program"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
