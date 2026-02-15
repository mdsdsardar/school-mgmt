const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const adminRouter = require("./routes/staff/admin.route");
const academicYearRouter = require("./routes/academics/academicYear.route");
const academicTermRouter = require("./routes/academics/academicTerm.route");
const classLevelRouter = require("./routes/academics/classLevel.route");
const programRouter = require("./routes/academics/program.route");
const subjectRouter = require("./routes/academics/subject.route");
const yearGroupRouter = require("./routes/academics/yearGroup.route");
const teacherRouter = require("./routes/staff/teachers.route");
const examRouter = require("./routes/academics/exam.route");
const studentRouter = require("./routes/staff/students.route");
const questionRouter = require("./routes/academics/question.route");
const examResultsRouter = require("./routes/academics/examResults.route");
const {
  notFoundErr,
  globalErrHandler,
} = require("./middlewares/globalErrHandler");

const app = express();
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" })); //pass incoming JSON data.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/exam-results", examResultsRouter);

// Error Handler MW
app.use("/api", notFoundErr);
app.use(globalErrHandler);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

module.exports = app;
