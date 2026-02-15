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
  questionDetails,
  updateClassLevel,
  updateExam,
  updateQuestion,
} from "../../../../slices/tech.slice";

const QuestionDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, question, isUpdated } = useSelector(
    (state) => state.tech,
  );

  const [questions, setQuestions] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    dispatch(questionDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (question) {
      setQuestions(question.questions || "");
      setOptionA(question.optionA || "");
      setOptionB(question.optionB || "");
      setOptionC(question.optionC || "");
      setOptionD(question.optionD || "");
      setCorrectAnswer(question.correctAnswer || "");
    }
  }, [question]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Question updated successfully");
      navigate("/teacher/all/question");
      dispatch(clearisUpdated());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("questions", questions);
    formData.set("optionA", optionA);
    formData.set("optionB", optionB);
    formData.set("optionC", optionC);
    formData.set("optionD", optionD);
    formData.set("correctAnswer", correctAnswer);
    dispatch(updateQuestion({ formData, id }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>; // ← Fixed condition

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Edit Question</div>

          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Questions</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="questions"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">optionA</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="optionA"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">optionB</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="optionB"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">optionC</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="optionC"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">optionD</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="optionD"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CorrectAnswer</label>
              <select
                className="form-select"
                name="correctAnswer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="">Select CorrectAnswer</option>
                <option key={optionA} value="optionA">
                  Option A
                </option>
                <option key={optionB} value="optionB">
                  Option B
                </option>
                <option key={optionC} value="optionC">
                  Option C
                </option>
                <option key={optionD} value="optionD">
                  Option D
                </option>
              </select>
            </div>
            <div className="mb-3">
              <p>
                <b>CreateBy: {question?.createdBy?.name}</b>
              </p>
            </div>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Question"}
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default QuestionDetails;
