import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  clearisUpdated,
  studentdetails,
  updateStudent,
} from "../../../slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { allAcademicYears } from "../../../slices/academic.slice";
import {
  allClassLevel,
  allSubjects,
  allPrograms,
} from "../../../slices/tech.slice";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, student, isUpdated } = useSelector(
    (state) => state.user,
  );
  const { allClasses, allProgram } = useSelector((state) => state.tech);
  const { allAcademicYear } = useSelector((state) => state.academic);

  const [isWithdrawn, setIsWithdrawn] = useState(false); // ← Boolean, not string
  const [isSuspended, setIsSuspended] = useState(false); // ← Boolean, not string
  const [classLevels, setClassLevels] = useState([]); // ← Array for multiple select
  const [perfectName, setPerfectName] = useState("");
  const [academicYears, setAcademicYears] = useState("");
  const [program, setProgram] = useState(""); // ← New field

  useEffect(() => {
    dispatch(studentdetails(id));
    dispatch(allAcademicYears());
    dispatch(allClassLevel());
    dispatch(allPrograms()); // ← Fetch programs
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (student) {
      setIsWithdrawn(student.isWithdrawn || false);
      setIsSuspended(student.isSuspended || false);
      setPerfectName(student.perfectName || "");
      setAcademicYears(student.academicYear?._id || student.academicYear || "");
      setProgram(student.program?._id || student.program || "");
      // Set class levels (handle both populated and non-populated)
      setClassLevels(
        student.classLevel?.map((c) => (typeof c === "object" ? c._id : c)) ||
          [],
      );
    }
  }, [student]); // ← Only depend on teacher

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("student updated successfully");
      navigate("/admin/all/students");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const handleMultiSelect = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setClassLevels(selected);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("isWithdrawn", isWithdrawn);
    formData.set("isSuspended", isSuspended);
    formData.set("academicYear", academicYears);
    formData.set("program", program);
    formData.set("perfectName", perfectName);
    // Append multiple class levels
    classLevels.forEach((classLevel) => {
      formData.append("classLevel", classLevel);
    });

    dispatch(updateStudent({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        {/* LEFT SIDE INFO */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Student Info</div>

            <div className="card-body">
              <p>
                <b>Name:</b> {student?.name}
              </p>
              <p>
                <b>Email:</b> {student?.email}
              </p>
              <p>
                <b>Student ID:</b> {student?.studentId}
              </p>
              <p>
                <b>PerfectName:</b> {student?.perfectName}
              </p>
              <p>
                <b>Withdrawn:</b>
                <span
                  className={`badge ${student?.isWithdrawn ? "bg-danger" : "bg-success"}`}
                >
                  {student?.isWithdrawn ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <b>Suspended:</b>
                <span
                  className={`badge ${student?.isSuspended ? "bg-danger" : "bg-success"}`}
                >
                  {student?.isSuspended ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE EDIT */}
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              Edit Student
            </div>

            <div className="card-body">
              {/* Withdrawn */}
              <div className="mb-3">
                <label className="form-label">Withdrawn</label>
                <select
                  className="form-select"
                  name="isWithdrawn"
                  value={isWithdrawn.toString()} // ← Convert to string for select
                  onChange={(e) => setIsWithdrawn(e.target.value === "true")} // ← Convert back to boolean
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {isWithdrawn ? (
                <div className="alert alert-warning">
                  Student is withdrawn. Update other fields to reactivate.
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Suspended</label>
                    <select
                      className="form-select"
                      name="isSuspended"
                      value={isSuspended.toString()} // ← Convert to string
                      onChange={(e) =>
                        setIsSuspended(e.target.value === "true")
                      } // ← Convert to boolean
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
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
                    <label className="form-label">Class Levels</label>
                    <select
                      multiple
                      className="form-select"
                      value={classLevels} // ← Array of selected IDs
                      onChange={handleMultiSelect}
                      style={{ minHeight: "120px" }}
                    >
                      {allClasses?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">
                      Hold CTRL (or CMD on Mac) to select multiple
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Perfect Name</label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="perfectName"
                      value={perfectName}
                      onChange={(e) => setPerfectName(e.target.value)}
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
                </div>
              )}

              <button
                className="btn btn-success w-100"
                onClick={submitHandler}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Student"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
