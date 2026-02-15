import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../shared/metaData";
import {
  allClassLevel,
  allPrograms,
  allSubjects,
  clearError,
  clearisCreated,
  createExam,
  createProgram,
  createSubject,
} from "../../../../slices/tech.slice";
import {
  allAcademicTerm,
  allAcademicYears,
} from "../../../../slices/academic.slice";

const CreateExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [passMark, setPassMark] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [duration, setDuration] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examDate, setExamDate] = useState(""); // ← Date as string
  const [examStatus, setExamStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [program, setProgram] = useState(""); // ← New field
  const [classLevel, setClassLevel] = useState("");
  const [academicTerm, setAcademicTerm] = useState("");

  const { loading, error, isCreated, allSubject, allClasses, allProgram } =
    useSelector((state) => state.tech);
  const { allTerm, allAcademicYear } = useSelector((state) => state.academic);
  useEffect(() => {
    dispatch(allAcademicTerm());
    dispatch(allAcademicYears());
    dispatch(allSubjects());
    dispatch(allClassLevel());
    dispatch(allPrograms()); // ← Fetch programs
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Exam Created Succesfully!");
      navigate("/admin/all/exam");
      dispatch(clearisCreated());
    }
  }, [isCreated, navigate, error]);
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
    formData.set("subject", subject);
    formData.set("academicYear", academicYear);
    formData.set("program", program);
    formData.set("classLevel", classLevel);
    formData.set("academicTerm", academicTerm);
    dispatch(createExam(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Create Exam"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Exam</h1>
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
                <option value="">Select Class Level</option>
                {allClasses?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREATE SUBJECT
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateExam;
