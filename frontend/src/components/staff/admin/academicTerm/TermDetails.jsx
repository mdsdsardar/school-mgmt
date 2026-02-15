import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  academicTermdetails,
  clearError,
  clearisUpdated,
  updateAcademicTerm,
} from "../../../../slices/academic.slice";

const TermDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, academicTerm, isUpdated } = useSelector(
    (state) => state.academic,
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    dispatch(academicTermdetails(id));
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (academicTerm) {
      setName(academicTerm.name || "");
      setDescription(academicTerm.description || "");
      setDuration(academicTerm.duration || "");
    }
  }, [academicTerm]); // ← Only depend on teacher

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Academic Term updated successfully");
      navigate("/admin/all/academic-term");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("duration", duration);
    dispatch(updateAcademicTerm({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Edit Academic Term</div>

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
                <b>CreateBy: {academicTerm?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Academic Term"}
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default TermDetails;
