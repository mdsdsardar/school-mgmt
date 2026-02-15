import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { allAcademicTerm } from "../../../../slices/academic.slice";
import {
  clearError,
  clearisUpdated,
  subjectdetails,
  updateSubject,
} from "../../../../slices/tech.slice";

const SubjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, subject, isUpdated } = useSelector(
    (state) => state.tech,
  );
  const { allTerm } = useSelector((state) => state.academic);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [academicTerm, setAcademicTerm] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    dispatch(subjectdetails(id));
    dispatch(allAcademicTerm());
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (subject) {
      setName(subject.name || "");
      setDescription(subject.description || "");
      setAcademicTerm(subject.academicTerm?._id || subject.academicTerm || "");
      setDuration(subject.duration || "");
    }
  }, [subject]); // ← Only depend on teacher

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Subject updated successfully");
      navigate("/admin/all/subjects");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("academicTerm", academicTerm);
    formData.set("duration", duration);
    dispatch(updateSubject({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Edit Subject</div>
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
            <div className="mb-3">
              <p>
                <b>CreateBy: {subject?.createdBy?.name}</b>
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

export default SubjectDetails;
