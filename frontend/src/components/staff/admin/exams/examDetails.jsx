import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  allClassLevel,
  allPrograms,
  classLevelDetails,
  clearError,
  clearisUpdated,
  examDetails,
  updateClassLevel,
  updateExam,
} from "../../../../slices/tech.slice";
import {
  allAcademicTerm,
  allAcademicYears,
} from "../../../../slices/academic.slice";

const ExamDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, exam, isUpdated, allClasses, allProgram } =
    useSelector((state) => state.tech);
  const { allAcademicYear, allTerm } = useSelector((state) => state.academic);

  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [passMark, setPassMark] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [duration, setDuration] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examDate, setExamDate] = useState(""); // ← Date as string
  const [examStatus, setExamStatus] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [program, setProgram] = useState(""); // ← New field
  const [classLevel, setClassLevel] = useState(""); // ← Array for multiple select
  const [academicTerm, setAcademicTerm] = useState("");

  useEffect(() => {
    dispatch(examDetails(id));
    dispatch(allAcademicYears());
    dispatch(allClassLevel());
    dispatch(allPrograms()); // ← Fetch programs
    dispatch(allAcademicTerm());
  }, [dispatch, id]);

  useEffect(() => {
    if (exam) {
      setName(exam.name || "");
      setDescripion(exam.description || "");
      setPassMark(exam.passMark?.toString() || ""); // ← Convert to string
      setTotalMark(exam.totalMark?.toString() || ""); // ← Convert to string
      setDuration(exam.duration || "");
      setExamTime(exam.examTime || "");
      setExamDate(
        exam.examDate
          ? new Date(exam.examDate).toISOString().split("T")[0]
          : "",
      );
      setExamStatus(exam.examStatus || "");
      setAcademicYear(exam.academicYear?._id || exam.academicYear || "");
      setProgram(exam.program?._id || exam.program || "");
      setAcademicTerm(exam.academicTerm?._id || exam.academicTerm || "");
      setClassLevel(exam.classLevel?._id || exam.classLevel || "");
    }
  }, [exam]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Exam updated successfully");
      navigate("/admin/all/exam");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("passMark", passMark);
    formData.set("totalMark", totalMark);
    formData.set("duration", duration);
    formData.set("examTime", examTime);
    formData.set("examDate", examDate);
    formData.set("examStatus", examStatus);
    formData.set("academicYear", academicYear);
    formData.set("program", program);
    formData.set("classLevel", classLevel);
    formData.set("academicTerm", academicTerm);
    dispatch(updateExam({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Edit Exam</div>

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
              <label className="form-label">ExamTime</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="examTime"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ExamStatus</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="examStatus"
                value={examStatus}
                onChange={(e) => setExamStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pass Mark</label>
              <input
                type="number"
                className="form-control"
                name="passMark"
                value={passMark}
                onChange={(e) => setPassMark(e.target.value)}
                min="0"
                max={totalMark || undefined} // Pass mark can't exceed total mark
                placeholder="Enter pass mark"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total Mark</label>
              <input
                type="number"
                className="form-control"
                name="totalMark"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
                min="0"
                placeholder="Enter total mark"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Exam Date</label>
              <input
                type="date"
                id="to_year_field"
                className="form-control"
                name="examDate"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
              />
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
              <label className="form-label">Class Level</label>
              <select
                className="form-select"
                name="classLevel"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              >
                <option value="">Select ClassLevel</option>
                {allClasses?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Academic Year</label>
              <select
                className="form-select"
                name="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="">Select Program</option>
                {allAcademicYear?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
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
                {allTerm?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {exam?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Exam"}
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ExamDetails;
