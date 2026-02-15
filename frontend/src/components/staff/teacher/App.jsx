import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../admin/dashboard";
import UserLayout from "../../shared/layout";
import Footer from "../../shared/footer";
import RegisterAdmin from "../auth/signupAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, setLoading } from "../../../slices/auth.slice";
import Profile from "../auth/profile";
import ProtectedRoute from "../../shared/protectedRoute";
import SignupTeacher from "../auth/signupTeacher";
import SingupStudent from "../auth/singupStudent";
import UpdatePassword from "../auth/updatePassword";
import UpdateProfile from "../auth/updateProfile";
import StudentLogin from "../auth/studentLogin";
import AdminLogin from "../auth/adminLogin";
import TeacherLogin from "../auth/teacherLogin";
import StudentList from "../students/studentList";
import SubjectList from "../admin/subjects/subjectList";
import ClassList from "../admin/classLevel/classList";
import ProgramList from "../admin/programs/programList";
import TermList from "../admin/academicTerm/termList";
import YearGroupList from "../admin/yearGroup/yearGroupList";
import AcademicYearList from "../admin/academicYear/academicYear";
import StudentDetails from "../students/studentDetails";
import SubjectDetails from "../admin/subjects/subjectDetails";
import TermDetails from "../admin/academicTerm/TermDetails";
import YearGroupDetails from "../admin/yearGroup/yearGroupDetails";
import ClassLevelDetails from "../admin/classLevel/classLevelDetails";
import ProgramDetails from "../admin/programs/programDetails";
import AcademicYearDetails from "../admin/academicYear/academicYearDetails";
import ExamDetails from "../admin/exams/examDetails";
import CreateAcademicYear from "../admin/academicYear/createAcademicYear";
import CreateAcademicTerm from "../admin/academicTerm/createTerm";
import CreateYearGroup from "../admin/yearGroup/createYearGroup";
import CreateProgram from "../admin/programs/createProgram";
import CreateClassLevel from "../admin/classLevel/createClassLevel";
import CreateSubject from "../admin/subjects/createSubject";
import CreateExam from "../admin/exams/createExam";
import QuestionList from "../admin/questions/questionsList";
import QuestionDetails from "../admin/questions/questionDetails";
import CreateQuestion from "../admin/questions/createQuestion";
import WriteExam from "../admin/exams/writeExam";
import ExamListForStudent from "../students/examListForStudent";
import ExamResultList from "../admin/examResults/examResultList";
import ExamResultListForStudent from "../students/examResultListForStudent";
import ExamResultDetails from "../admin/examResults/examResultDetails";
import TeacherList from "./teacherList";
import ExamList from "./examList";
import TeacherDetails from "./TeacherDetails";

function App() {
  const dispatch = useDispatch();
  const { userLoaded } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userLoaded) {
      dispatch(loadUser());
    }
  }, [dispatch, userLoaded]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/register/admin" element={<RegisterAdmin />} />
            <Route path="/register/teacher" element={<SignupTeacher />} />
            <Route path="/admin/teacher/:id" element={<TeacherDetails />} />
            <Route path="/admin/all/teachers" element={<TeacherList />} />
            <Route path="/register/student" element={<SingupStudent />} />
            <Route path="/admin/student/:id" element={<StudentDetails />} />
            <Route path="/admin/all/students" element={<StudentList />} />
            <Route path="/admin/create/subjects" element={<CreateSubject />} />
            <Route path="/admin/all/subjects" element={<SubjectList />} />
            <Route path="/admin/subject/:id" element={<SubjectDetails />} />
            <Route path="/admin/create/program" element={<CreateProgram />} />
            <Route path="/admin/all/program" element={<ProgramList />} />
            <Route path="/admin/program/:id" element={<ProgramDetails />} />
            <Route
              path="/admin/create/academic-term"
              element={<CreateAcademicTerm />}
            />
            <Route path="/admin/all/academic-term" element={<TermList />} />
            <Route path="/admin/academic-term/:id" element={<TermDetails />} />
            <Route
              path="/admin/create/year-group"
              element={<CreateYearGroup />}
            />
            <Route path="/admin/all/year-group" element={<YearGroupList />} />
            <Route
              path="/admin/year-group/:id"
              element={<YearGroupDetails />}
            />
            <Route
              path="/admin/all/academic-year"
              element={<AcademicYearList />}
            />
            <Route
              path="/admin/create/academic-year"
              element={<CreateAcademicYear />}
            />
            <Route
              path="/admin/academicYear/:id"
              element={<AcademicYearDetails />}
            />
            <Route path="/admin/all/classLevel" element={<ClassList />} />
            <Route
              path="/admin/create/classLevel"
              element={<CreateClassLevel />}
            />
            <Route
              path="/admin/classLevel/:id"
              element={<ClassLevelDetails />}
            />
            <Route
              path="/admin/list/exam-result"
              element={<ExamResultList />}
            />
            <Route
              path="/admin/exam-result/:id"
              element={<ExamResultDetails />}
            />
          </Route>
          <Route element={<ProtectedRoute isTeacher={true} />}>
            <Route path="/admin/create/exam" element={<CreateExam />} />
            <Route path="/admin/all/exam" element={<ExamList />} />
            <Route path="/admin/exam/:id" element={<ExamDetails />} />
            <Route
              path="/teacher/create/question"
              element={<CreateQuestion />}
            />
            <Route path="/teacher/all/question" element={<QuestionList />} />
            <Route path="/teacher/question/:id" element={<QuestionDetails />} />
          </Route>
          <Route element={<ProtectedRoute isStudent={true} />}>
            <Route path="/student/list/exam" element={<ExamListForStudent />} />
            <Route
              path="/student/list/exam-result"
              element={<ExamResultListForStudent />}
            />
            <Route
              path="/student/exam-result/:id"
              element={<ExamResultDetails />}
            />
            <Route path="/student/write/exam/:id" element={<WriteExam />} />
          </Route>

          <Route path="/update/password" element={<UpdatePassword />} />
          <Route path="/update/profile" element={<UpdateProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
