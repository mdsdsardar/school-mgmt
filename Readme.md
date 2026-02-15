**************************** Postman **************************** 
1st create a folder in postman, with your project name, then create sub folder for each mongodb model for consistancy.
Create new environment for your project and then create all the important env vars like baseURL or other users token.

**************************** server.js ****************************
We have imported dotenv{3rd Party pkg}, http{1st party pkg}, app & dbConnect{local file}.
const PORT = process.env.PORT || 3000 //check if port is defined in env file.
const server = http.createServer(app); //create server with http module, and initialise app module which contain routes, written in express pkg.
server.listen(PORT) //Then listen on defined port.

**************************** ./config/dbConnect ****************************
const mongoose = require("mongoose"); //Not a native drive like mongodb.
It provides schema validation, need to define data shapes 1st, we will builtin validation, provide better data consistancy, easier learning curves. better for CRUD operations.
{Native mongodb driver provides max flexibility with schema less data, but it's lighter and slightly faster.}

mongoose.connect(MONGO_URL) //connect with DB, using try, catch to capture error while connecting to DB.

**************************** app.js ****************************
We have imported express & morgan {3rd Party pkg}, morgan use for console lvl debugging and express for routing.
Then we are using MW to handle scenario's like not found link or if we observed err in any route, we will send the prepared json response for both scenario's.
const app = express(); app.use(express.json()); assign app express function, and express.json is to send json response.

**************************** Logic in Controller/route. ****************************
for desc. define purpose of controller, whole route with method like post/get, and access like admin only/public. {Optional}
We are covering whole controller logic inside {AsyncHandler} function, it'll take care of error handeling, best alternative for try, catch. we will catch AsyncHandler error in error handelling MW which will send res. to frontend.
then we will check if email/user already exist, based on req. if it satisfied we will proceed, else we will send error with correct status code to error handelling MW.
We should create MW {filtredMW}, which filter allowed path from req.body. then directly update this filtered data into DB. for updating we can use MW updateMW.js which will centralise all model update operations
After that we will do the create/update/delete Ops, and store that Ops in var. which we will send as response as well.
adminFound.teachers.push(teacherCreated?._id); {adminFound - contain admin user data, teacherCreated - it contains recently updated teacher data, teachers - this is the name which we used in admin model, it must be same as we are pushing data into admin model.}
we are defining common route in app.js for every module, and the rest route we are defining in their personal file.
Although pagination is not implemented in every ctr but whenever we are fetching large amount of data ensure we are doing pagination

**************************** app.use("/api/v1/admins", adminRouter) ****************************
********************** adminRouter.post("/register", registerAdmCtrl) ***********************
1st we will fetch name, email & password from body, then check if email already exists or not?
const user = await Admin.create({name, email, password: await hashedPassword(password)}) - Then we are creating admin user using Admin model, after hashing password {we are using bcrypt module for hasing password}. make sure while creation you are providing all the required field of model. and then send the user data as response.

**************************** adminRouter.post("/login", loginAdminCtr) ****************************
fetch email & password from body, check user exist or not, then compare the user password with hashed password using bcrypt module, if user/password not found/matched throw an error else,
jwt.sign({ id }, "anykey", { expiresIn: "5d" }); send response with an id to generateToken mw. as we are not storing token in db, so store it in postman env.

******************* adminRouter.get("/", isAuth(Admin), advanceResults(Admin), getAdminsCtr) ******************
isAuth(Admin) - this MW will take model as input and fetch token from headers, then we will use {verify_token MW} to verify if the token is valid/expired? If it is valid we will get the decoded data of token, which contain id. 
we will use that id to fetch name, email & role from db and store it in req.userAuth request for future use.

advanceResults(Admin) - This MW will fetch the data page wise, we have to provide limit and page no.
let TeacherQuery = model.find(); //create one query parameter, this is just a query not the actual data.
if (req.query.name) {TeacherQuery = TeacherQuery.find({name: { $regex: req.query.name, $options: "i" }})} - it means we can name paramter in url, if we want to search some specific data instead of all. Then we have written page creation logic as well instead of fetching all data by using skip and limit feature, once we fetch req data return it in response.
res.status(200).json(res.results) - then send that response data in JSON format.

******************* adminRouter.get("/profile", isAuth(Admin), roleRestriction("admin"), getAdminProfileCtr) ******************
roleRestriction("admin") - as we are fetching role of user from DB by using isAuth MW. we will check in roleRestriction MW if the user role matches with our req. role or not?
In ctr we fetch data using userAuth._id, we will populate all the nested feilds and we will not fetch password feild. 

******************* adminRouter.put("/", isAuth(Admin), roleRestriction("admin"), updateAdminCtr) ******************
We will accept input like email, name and password, 1st we will check if email already exists or not?
Then we will check if user is updating password or not, if yes all 3 feilds, if not then update only name and email.
we are using 2 parameter like new: true, runValidators: true. new true means return update doc, mongoose validation check.

******************* adminRouter.put("/update/teacher/:teacherID", isAuth(Admin), roleRestriction("admin"), adminUpdateTeacher) ******************
From body fetch the recent status of teacher are they withdrawn/suspended. and teacherID check if teacher exists or not?
If yes, then update the recent data to it, use new true and enable mongoose validator to ensure data consistancy.

**************************** app.use("/api/v1/academic-years", academicYearRouter) ****************************
******************* academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear) ******************
As usual we will fetch the required data from body and then other data we will modify when necessary/req.
we will fetch name{like mech engg.}, from year & to year{difference between can be 4 year} from body. with the help of name check if academicyear already exists or not? then create academicyear, and update createdby feild user from req.userAuth._id.
then fetch admin userId and update academicyear feild of that admin with the recent data. and then send the response.

******************* academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears) ******************
We will fetch all the academicYear created, pagination can be implemented here.

******************* academicYearRouter.get("/:id", isLogin, isAdmin, getSingleAcademicYears) ******************
fetch single academic year with the help of provided ID.

******************* academicYearRouter.get("/:id", isLogin, isAdmin, updateAcademicYear) ******************
we will fetch all the updated feild from body, then if name provided check if it already exists or not? later update the feilds in db.

******************* academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear) ******************
with the help of id, we will delete the year from db.

**************************** app.use("/api/v1/academic-years", academicYearRouter) ****************************
**************************** academicTermRouter.post("/", isLogin, isAdmin, createAcademicTerm) ****************************
Fetch required fields from body, check if name aleardy exist as we dont want name duplication, then create these feild into DB.
push the term id into admin model, to keep track on who created this term.

**************************** academicTermRouter.get("/", isLogin, isAdmin, getAcademicTerms) ****************************
fetch all academic term available in DB, use pagination.

**************************** academicTermRouter.get("/:id", isLogin, isAdmin, getSingleAcademicTerms) ****************************
fetch single academic term from db by using ID.

**************************** academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicTerm) ****************************
fetch updated feilds from db, check if name already exist. If not then update the feild in DB

**************************** academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicTerm) ****************************
Delete the academicTerm from DB using it's ID.

**************************** app.use("/api/v1/class-levels", classLevelRouter) ****************************
**************************** classLevelRouter.post("/", isLogin, isAdmin, createClassLevel) ****************************
Fetch the required data from body, check if name already exists? else create class and then push class id into admin model.

**************************** classLevelRouter.get("/", isLogin, isAdmin, getClassLevels) ****************************
fetch all class level available in db, make sure to enable pagination later.

**************************** classLevelRouter.get("/:id", isLogin, isAdmin, getSingleClassLevel) ****************************
fetch single class level from DB using it's ID.

**************************** classLevelRouter.put("/:id", isLogin, isAdmin, updateClassLevel) ****************************
fetch the updated fields from body, then update them into db, check certain feild if they already exists or not before updating.

**************************** classLevelRouter.delete("/:id", isLogin, isAdmin, deleteClassLevel) ****************************
Delete the class level by using it's ID.

**************************** app.use("/api/v1/programs", programRouter) ****************************
**************************** programRouter.post("/", isLogin, isAdmin, createProgram) ****************************
Fetch input from body, check duplication and then create the program, update the program into admin\

**************************** programRouter.get("/", isLogin, isAdmin, getProgram) ****************************
Fetch all the available program from DB, pagination is possible here.

**************************** programRouter.get("/:id", isLogin, isAdmin, getSingleprogram) ****************************
Fetch single program from DB using provided ID.

**************************** programRouter.put("/:id", isLogin, isAdmin, updateProgram) ****************************
Fetch provided data, and check some condition and update them into DB.

**************************** programRouter.delete("/:id", isLogin, isAdmin, deleteProgram) ****************************
Delete the program from the DB with the given ID.

**************************** app.use("/api/v1/subjects", subjectRouter) ****************************
**************************** subjectRouter.post("/:programID", isLogin, isAdmin, createSubject) ****************************
Fetch input from body, check if program found or not, as every subject must be connected with it's program {like mech. engg.}
then check if name is duplicate or not. Then create the subject and push the subject id into program.

**************************** subjectRouter.get("/", isLogin, isAdmin, getSubjects) ****************************
Fetch all the subject, dont forget the pagination in it.

**************************** subjectRouter.get("/:id", isLogin, isAdmin, getSingleSubject) ****************************
Fetch single subject using it's ID.

**************************** subjectRouter.put("/:id", isLogin, isAdmin, updateSubject) ****************************
Fetch updated feilds from body, check name duplication then update the feild into the DB

**************************** subjectRouter.delete("/:id", isLogin, isAdmin, deleteSubjects) ****************************
Delete the subjects using it's ID.

**************************** app.use("/api/v1/year-groups", yearGroupRouter) ****************************
**************************** yearGroupRouter.post("/", isLogin, isAdmin, createYearGroup) ****************************
Fetch req. feilds from body, check name duplication, create year group, then update it in admin feild.

**************************** yearGroupRouter.get("/", isLogin, isAdmin, getYearGroup) ****************************
Get all year group from DB, pagination needed here.

**************************** yearGroupRouter.get("/:id", isLogin, isAdmin, getSingleYearGroup) ****************************
Get single year group from DB by using provided ID.

**************************** yearGroupRouter.put("/:id", isLogin, isAdmin, updateYearGroup) ****************************
Fetch updated feilds from body, check name duplication and update the requested feilds.

**************************** yearGroupRouter.put("/:id", isLogin, isAdmin, updateYearGroup) ****************************
Delete the update feild from DB by using its ID.

**************************** app.use("/api/v1/teachers", teacherRouter) ****************************
**************************** teacherRouter.post("/admin/register", isAuth(Admin), roleRestriction("admin"), adminRegisterTeacher) ****************************
Fetch req. input from body, check email exist, hash password and then add the feild into DB. push added teacher id into admin.

**************************** teacherRouter.post("/login", loginTeacher) ****************************
Fetch email & password from body, check email exist, compare hash password with the user provided passwrod, if it matches allow login.

**************************** teacherRouter.get("/admin", isAuth(Admin), roleRestriction("admin"),
  advanceResults(Teacher, {path: "examsCreated", populate: {path: "questions"}}), getAllTeachers) ****************************
We are using advanceResults MW, which enables pagination and pupulate requested feilds. best practise for fetching data.

**************************** teacherRouter.get("/profile", isAuth(Teacher), roleRestriction('teacher'), getTeacherProfile) ****************************
Fetch specifc teachers profile using using teacher own login tokens, dont fetch password createdAt & updatedAt feilds

**************************** teacherRouter.get("/:teacherID/admin", isAuth(Admin), roleRestriction("admin"), getSingleTeacher) ****************************
Fetch specifc teacher by using it's custom id, admin only mode.

**************************** teacherRouter.get("/:teacherID/update/admin", isAuth(Admin), roleRestriction("admin"), adminUpdateTeacher) ****************************
Fetch input from DB, check if teacher exist and teacher is not withdrawn. then assign program, class level, admin only mode.

**************************** teacherRouter.put("/:teacherID/update", isAuth(Teacher), roleRestriction('teacher'), teacherUpdateProfile) ****************************
Fetch updated feild from DB, check if email exists, If password is also updated hash password before updating it into DB teacher only.



**************************** app.use("/api/v1/exams", examRouter) ****************************
**************************** examRouter.route("/").post(isTeacherLogin, isTeacher, createExam) ****************************
Fetch req. input from body, check name duplication then create the exam, then update exam id into teacher model

**************************** examRouter.route("/").get(isTeacherLogin, isTeacher, getAllExam) ****************************
Fetch all exam and populate questions feild.

**************************** examRouter.route("/:id").get(isTeacherLogin, isTeacher, getSingleExam) ****************************
Get single exam by using its ID.

**************************** examRouter.route("/:id").put(isTeacherLogin, isTeacher, updateExam) ****************************
Fetch update feild from body, check name duplication, then update the feilds into Db using it's ID.

**************************** examRouter.route("/:id").delete(isTeacherLogin, isTeacher, deleteExam) ****************************
Delete the exam by using it's provided ID.

**************************** studentRouter.post("/admin/register", isAuth(Admin), roleRestriction("admin"), adminRegisterStudents) ****************************
Fetch req. feilds from DB, check email exist else hash the password and create the student user. also push it's ID it in admin model.

**************************** studentRouter.post("/login", loginStudents) ****************************
Fetch email, password from body, check email exist, compare user password with hashed password, if it satisfies provide login token.

**************************** studentRouter.get("/admin", isAuth(Admin), roleRestriction("admin"), getAllStudents) ****************************
Fetch all students, enable pagination, admin only.

**************************** studentRouter.get("/:studentID/admin", isAuth(Admin), roleRestriction("admin"), getStudentsByAdmin) ****************************
Fetch profile from DB using Student ID, then modify the data accordingly like populate examResults skip password related feild and check if exam is published or not, if not published dont show it in students profile.

**************************** studentRouter.put("/update", isAuth(Student), roleRestriction("student"), studentUpdateProfile) ****************************
fetch body, check email exist, check if user want to update the password, if yes then hash the password and update it in DB.

**************************** studentRouter.put("/:studentID/update/admin", isAuth(Admin), roleRestriction("admin"), adminUpdateStudents) ****************************
fetch updated feilds from body and after some validation add them into DB we are using $addToSet as instead of overriding the existing class we are appending the newly added class into it.

**************************** studentRouter.post("/exam/:examID/write", isAuth(Student), roleRestriction("student"), writeExam) ****************************
Check if we are able to find student and exam in Db also populate questions and academicterm from exam model.
fetch questions answer from body and then compare it with total question to check if all questions are answered.
Check if student found in result {means student already attended an exam} or student is suspended/withdrawn?
use multiple JS logic to feed correctAnswer, wrongAnswer and asnweredQuestions varibles correct value.
Then with the help of them generate grade, score, remark and status.
After getting all these value create ExamResult model in DB also push this result into student model.
We have also created classLevel promotion logic, If student is passed It'll be promoted.

**************************** app.use("/api/v1/questions", questionRouter) ****************************
**************************** questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion) ****************************
Fetch exam by using ExamID 1st, as examID must be valid, then check if question exist, if not created question with provided body.
then push the created question ID into exam model.

**************************** questionRouter.get("/", isTeacherLogin, isTeacher, getAllQuestions) ****************************
fetch all the question created so far, enable paginations.

**************************** questionRouter.get("/:id", isTeacherLogin, isTeacher, getSingleQuestion) ****************************
fetch single question by using it id.

**************************** questionRouter.put("/:id", isTeacherLogin, isTeacher, updateQuestions) ****************************
fetch updated feild from body, check if question exist, if yes then update the field!

**************************** app.use("/api/v1/exam-results", examResultsRouter) ****************************
**************************** examResultsRouter.get("/:id/checking", isStudentLogin, isStudent, checkExamResult) ****************************
check if student exists or not, fetch exam results by using provided id, then populate all req. fields if exam is published else not.

**************************** examResultsRouter.get("/", isStudentLogin, isStudent, getAllExamResult) ****************************
fetch all exam results, just populate exam field here.

**************************** examResultsRouter.put("/:id/admin-toggle-publish", isLogin, isAdmin, adminPublishExamResults) ****************************
fetch the latest data from body either we want to publish exam results or not.