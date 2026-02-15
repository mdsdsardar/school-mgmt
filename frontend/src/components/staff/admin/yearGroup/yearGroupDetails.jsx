import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  allAcademicYears,
  clearError,
  clearisUpdated,
  updateYearGroup,
  yearGroupDetails,
} from "../../../../slices/academic.slice";

const YearGroupDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, yearGroup, isUpdated, allAcademicYear } = useSelector(
    (state) => state.academic,
  );
  const [name, setName] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  useEffect(() => {
    dispatch(yearGroupDetails(id));
    dispatch(allAcademicYears());
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (yearGroup) {
      setName(yearGroup.name || "");
      setAcademicYear(
        yearGroup.academicYear?._id || yearGroup.academicYear || "",
      );
    }
  }, [yearGroup]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Year Group updated successfully");
      navigate("/admin/all/year-group");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("yearGroup", yearGroup);
    dispatch(updateYearGroup({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            Edit Year Group
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
              <label className="form-label">Academic Year</label>
              <select
                className="form-select"
                name="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="">Select Academic Year</option>
                {allAcademicYear?.map((y) => (
                  <option key={y._id} value={y._id}>
                    {y.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {yearGroup?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Year Group"}
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default YearGroupDetails;
