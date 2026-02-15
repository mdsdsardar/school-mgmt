import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  clearisUpdated,
  teacherdetails,
  updateTeacher,
} from "../../../slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { allAcademicYears } from "../../../slices/academic.slice";
import {
  allClassLevel,
  allSubjects,
  allPrograms,
} from "../../../slices/tech.slice";
import Sidebar from "../admin/sidebar/sidebar";

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, teacher, isUpdated } = useSelector(
    (state) => state.user,
  );
  const { allSubject, allClasses, allProgram } = useSelector(
    (state) => state.tech,
  );
  const { allAcademicYear } = useSelector((state) => state.academic);

  const [isWithdrawn, setIsWithdrawn] = useState(false); // ← Boolean, not string
  const [isSuspended, setIsSuspended] = useState(false); // ← Boolean, not string
  const [classLevels, setClassLevels] = useState([]); // ← Array for multiple select
  const [subjects, setSubjects] = useState("");
  const [academicYears, setAcademicYears] = useState("");
  const [program, setProgram] = useState(""); // ← New field

  useEffect(() => {
    dispatch(teacherdetails(id));
    dispatch(allAcademicYears());
    dispatch(allSubjects());
    dispatch(allClassLevel());
    dispatch(allPrograms()); // ← Fetch programs
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  useEffect(() => {
    if (teacher) {
      setIsWithdrawn(teacher.isWithdrawn || false);
      setIsSuspended(teacher.isSuspended || false);
      setSubjects(teacher.subject?._id || teacher.subject || "");
      setAcademicYears(teacher.academicYear?._id || teacher.academicYear || "");
      setProgram(teacher.programs?._id || teacher.programs || "");
      // Set class levels (handle both populated and non-populated)
      setClassLevels(
        teacher.classLevel?.map((c) => (typeof c === "object" ? c._id : c)) ||
          [],
      );
    }
  }, [teacher]); // ← Only depend on teacher

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Teacher updated successfully");
      navigate("/admin/all/teachers");
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
    formData.set("subject", subjects);
    formData.set("programs", program);

    // Append multiple class levels
    classLevels.forEach((classLevel) => {
      formData.append("classLevel", classLevel);
    });

    dispatch(updateTeacher({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        {/* LEFT SIDE INFO */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Teacher Info</div>

            <div className="card-body">
              <p>
                <b>Name:</b> {teacher?.name}
              </p>
              <p>
                <b>Email:</b> {teacher?.email}
              </p>
              <p>
                <b>Teacher ID:</b> {teacher?.teacherId}
              </p>
              <p>
                <b>Status:</b> {teacher?.applicationStatus}
              </p>
              <p>
                <b>Withdrawn:</b>{" "}
                <span
                  className={`badge ${teacher?.isWithdrawn ? "bg-danger" : "bg-success"}`}
                >
                  {teacher?.isWithdrawn ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <b>Suspended:</b>{" "}
                <span
                  className={`badge ${teacher?.isSuspended ? "bg-danger" : "bg-success"}`}
                >
                  {teacher?.isSuspended ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE EDIT */}
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              Edit Teacher
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
                  Teacher is withdrawn. Update other fields to reactivate.
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
                    <label className="form-label">Subject</label>
                    <select
                      className="form-select"
                      name="subject"
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {allSubject?.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
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
                {loading ? "Updating..." : "Update Teacher"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
