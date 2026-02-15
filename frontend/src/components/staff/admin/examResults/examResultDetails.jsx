import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearisUpdated,
  examResultDetails,
  programDetails,
  updateExamResult,
  updateProgram,
} from "../../../../slices/tech.slice";

const ExamResultDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, isUpdated, examResult } = useSelector(
    (state) => state.tech,
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isPublished, setIsPublished] = useState(false);
  useEffect(() => {
    if (examResult) {
      setIsPublished(examResult.isPublished || false);
    }
  }, [examResult]); // ← Only depend on teacher

  useEffect(() => {
    dispatch(examResultDetails(id));
  }, [dispatch, id]);

  // Separate effect to update form when teacher data loads
  // useEffect(() => {
  //   if (program) {
  //     setName(program.name || "");
  //     setDescription(program.description || "");
  //     setDuration(program.duration || "");
  //   }
  // }, [program]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Exam Result Updated successfully");
      navigate("/admin/list/exam-result");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("publish", isPublished);
    dispatch(updateExamResult({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            {examResult?.exam?.name} - Result
          </div>

          <div className="card-body">
            <p>
              <b>Student ID:</b> {examResult?.studentID}
            </p>
            <p>
              <b>Grade:</b> {examResult?.grade}
            </p>
            <p>
              <b>Score:</b> {examResult?.score}
            </p>
            <p>
              <b>Pass Mark:</b> {examResult?.passMark}
            </p>
            <p>
              <b>Status:</b> {examResult?.status}
            </p>
            <p>
              <b>Remarks:</b> {examResult?.remarks}
            </p>
            <p>
              <b>Class Level:</b> {examResult?.classLevel?.name}
            </p>
            <p>
              <b>Academic Term:</b> {examResult?.academicTerm?.name}
            </p>
            <p>
              <b>Academic Year:</b> {examResult?.academicYear?.name}
            </p>
            <hr />

            {isAuthenticated &&
            user?.role === "student" &&
            examResult?.answeredQuestions?.length > 0
              ? examResult.answeredQuestions.map((q, index) => (
                  <div>
                    <h5 className="mb-3">Answered Questions</h5>
                    <div
                      key={index}
                      className={`p-3 mb-2 rounded border ${
                        q.isCorrect
                          ? "border-success bg-light"
                          : "border-danger bg-light"
                      }`}
                    >
                      <p className="mb-1">
                        <b>Q{index + 1}:</b> {q.question}
                      </p>

                      <p className="mb-1">
                        <b>Correct Answer:</b> {q.correctAnswers}
                      </p>

                      <p className="mb-0">
                        <b>Status:</b>{" "}
                        <span
                          className={
                            q.isCorrect ? "text-success" : "text-danger"
                          }
                        >
                          {q.isCorrect ? "Correct" : "Wrong"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              : null}
            {isAuthenticated && user?.role === "admin" ? (
              <div>
                <div className="mb-3">
                  <label className="form-label">isPublished</label>
                  <select
                    className="form-select"
                    name="isPublished"
                    value={isPublished.toString()} // ← Convert to string for select
                    onChange={(e) => setIsPublished(e.target.value === "true")} // ← Convert back to boolean
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <button
                  className="btn btn-success w-100"
                  onClick={submitHandler}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Exam Result"}
                </button>{" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultDetails;
