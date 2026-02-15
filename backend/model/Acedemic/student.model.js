const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
      maxLength: [30, "Your name cannot exceed 30 character."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password!"],
      minlength: [6, "Your password must be longer than 6 character"],
      select: false,
    },
    studentId: {
      type: String,
      required: true,
      default: function () {
        return (
          "STU" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    role: {
      type: String,
      default: "student",
    },
    //Keep track of class level, which are from 1-6.
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    currentClassLevel: {
      type: String,
      default: function () {
        return this.classLevels[this.classLevels.length - 1];
      },
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },
    examResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamResult",
      },
    ],
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
    isPromotedToLevel200: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel300: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel400: {
      type: Boolean,
      default: false,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    perfectName: {
      type: String,
      trim: true,
      maxLength: [30, "Your name cannot exceed 30 character."],
    },
    yearGraduated: {
      type: Date,
    },
  },
  { timestamps: true },
);

//Encrypting Password before saving it.
studentSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; //never mix async with next.
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//verify password.
studentSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Return JWT token,
studentSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      model: this.constructor.modelName, // Admin | Teacher | Student
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    },
  );
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
