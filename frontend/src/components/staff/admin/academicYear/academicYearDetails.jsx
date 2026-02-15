import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  academicYearDetails,
  allAcademicYears,
  clearError,
  clearisUpdated,
  updateAcademicYear,
  updateYearGroup,
  yearGroupDetails,
} from "../../../../slices/academic.slice";

const AcademicYearDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, academicYear, isUpdated } = useSelector(
    (state) => state.academic,
  );
  const [name, setName] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [fromYear, setFromYear] = useState(""); // ← Date as string
  const [toYear, setToYear] = useState(""); // ← Date as string

  useEffect(() => {
    dispatch(academicYearDetails(id));
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (academicYear) {
      setName(academicYear.name || "");
      setIsCurrent(academicYear.isCurrent || false);
      setFromYear(
        academicYear.fromYear
          ? new Date(academicYear.fromYear).toISOString().split("T")[0]
          : "",
      );
      setToYear(
        academicYear.toYear
          ? new Date(academicYear.toYear).toISOString().split("T")[0]
          : "",
      );
    }
  }, [academicYear]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Academic Year updated successfully");
      navigate("/admin/all/academic-year");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("fromYear", fromYear);
    formData.set("toYear", toYear);
    formData.set("isCurrent", isCurrent);
    dispatch(updateAcademicYear({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            Edit Academic Year
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
            <div className="mb-3">
              <label className="form-label">Is Current?</label>
              <select
                className="form-select"
                name="isCurrent"
                value={isCurrent.toString()}
                onChange={(e) => setIsCurrent(e.target.value === "true")}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {academicYear?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Academic Year"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearDetails;
