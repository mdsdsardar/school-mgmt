import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../shared/metaData";
import {
  allClassLevel,
  allExams,
  allPrograms,
  allSubjects,
  clearError,
  clearisCreated,
  createExam,
  createProgram,
  createQuestion,
  createSubject,
} from "../../../../slices/tech.slice";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [exam, setExam] = useState("");

  const { loading, error, isCreated, allExam } = useSelector(
    (state) => state.tech,
  );
  useEffect(() => {
    dispatch(allExams());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isCreated) {
      toast.success("Question Created Succesfully!");
      navigate("/teacher/all/question");
      dispatch(clearisCreated());
    }
  }, [isCreated, navigate, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("questions", questions);
    formData.set("optionA", optionA);
    formData.set("optionB", optionB);
    formData.set("optionC", optionC);
    formData.set("optionD", optionD);
    formData.set("correctAnswer", correctAnswer);
    dispatch(createQuestion({ formData, examID: exam }));
  };
  return (
    <Fragment>
      <MetaData title={"Create Exam"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Create Question</h1>
            <div className="form-group">
              <label htmlFor="email_field">Question</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="questions"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_field">OptionA</label>
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
              <label className="form-label">OptionB</label>
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
              <label className="form-label">OptionC</label>
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
              <label className="form-label">OptionD</label>
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
                  A: {optionA}
                </option>
                <option key={optionB} value="optionB">
                  B: {optionB}
                </option>
                <option key={optionC} value="optionC">
                  C: {optionC}
                </option>
                <option key={optionD} value="optionD">
                  D: {optionD}
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Exam</label>
              <select
                className="form-select"
                name="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
              >
                <option value="">Select Exam</option>
                {allExam?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
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
              CREATE QUESTION
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateQuestion;
