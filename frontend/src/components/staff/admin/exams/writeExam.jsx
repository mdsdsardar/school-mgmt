import { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearisSubmitted,
  examDetails,
  writeExam,
} from "../../../../slices/tech.slice";
import MetaData from "../../../shared/metaData";

const WriteExam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exam, loading, error, isSubmitted } = useSelector(
    (state) => state.tech,
  );

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    dispatch(examDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (exam?.duration) {
      const durationInMinutes = parseInt(exam.duration);
      setTimeLeft(durationInMinutes * 60);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isSubmitted) {
      toast.success("Exam Submitted successfully");
      navigate("/student/list/exam");
      dispatch(clearisSubmitted());
    }
  }, [error, isSubmitted, dispatch, navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const answersArray = exam.questions.map((q) => {
      return answers[q._id] || null;
    });
    const unanswered = answersArray.filter((a) => !a);
    if (unanswered.length > 0) {
      const confirm = window.confirm(
        `You have ${unanswered.length} unanswered question(s). Submit anyway?`,
      );
      if (!confirm) return;
    }

    dispatch(
      writeExam({
        examId: id,
        answers: answersArray,
      }),
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (loading) return <div className="text-center mt-5">Loading exam...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!exam) return <div className="text-center mt-5">Exam not found</div>;

  return (
    <div className="container mt-4">
      <MetaData title={`Take Exam - ${exam.name}`} />

      {/* Exam Header */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{exam.name}</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Description:</strong> {exam.description}
              </p>
              <p className="mb-2">
                <strong>Subject:</strong> {exam.subject?.name || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Academic Term:</strong>
                {exam.academicTerm?.name || "N/A"}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Total Marks:</strong> {exam.totalMark}
              </p>
              <p className="mb-2">
                <strong>Pass Marks:</strong> {exam.passMark}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> {exam.duration}
              </p>
              <p className="mb-2">
                <strong>Questions:</strong> {exam.questions?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timer and Progress */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">
                Time Remaining:
                <span
                  className={`ms-2 ${timeLeft < 60 ? "text-danger" : "text-success"}`}
                >
                  {formatTime(timeLeft)}
                </span>
              </h5>
            </div>
            <div className="col-md-6 text-end">
              <h5 className="mb-0">
                Progress: {getAnsweredCount()} / {exam.questions?.length || 0}
                answered
              </h5>
            </div>
          </div>
          <div className="progress mt-2" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{
                width: `${(getAnsweredCount() / (exam.questions?.length || 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Debug: Show current answers */}
      {/* <pre>{JSON.stringify(answers, null, 2)}</pre> */}

      {/* Questions */}
      <form onSubmit={handleSubmit}>
        {exam.questions?.map((question, index) => {
          const questionKey = question._id || index;
          const selectedAnswer = answers[questionKey];

          return (
            <div key={questionKey} className="card shadow-sm mb-3">
              <div className="card-body mx-3">
                <p>{question.questions}</p>
                <input
                  type="radio"
                  className="mx-1"
                  name={`question_${index}`}
                  checked={selectedAnswer === "optionA"}
                  onChange={() => handleAnswerChange(questionKey, "optionA")}
                />
                A: {question.optionA}
                <input
                  type="radio"
                  className="ms-3  mx-1"
                  name={`question_${index}`}
                  checked={selectedAnswer === "optionB"}
                  onChange={() => handleAnswerChange(questionKey, "optionB")}
                />
                B: {question.optionB}
                <input
                  type="radio"
                  className="ms-3  mx-1"
                  name={`question_${index}`}
                  checked={selectedAnswer === "optionC"}
                  onChange={() => handleAnswerChange(questionKey, "optionC")}
                />
                C: {question.optionC}
                <input
                  type="radio"
                  className="ms-3  mx-1"
                  name={`question_${index}`}
                  checked={selectedAnswer === "optionD"}
                  onChange={() => handleAnswerChange(questionKey, "optionD")}
                />
                D: {question.optionD}
              </div>
            </div>
          );
        })}
        {/* Submit Button */}
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg px-5"
              disabled={getAnsweredCount() === 0}
            >
              Submit Exam
            </button>
            {getAnsweredCount() === 0 && (
              <p className="text-muted mt-2 mb-0">
                Please answer at least one question to submit
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteExam;
