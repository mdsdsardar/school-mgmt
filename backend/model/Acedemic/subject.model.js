const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      unique: true,
      trim: true,
      maxLength: [30, "Your name cannot exceed 30 character."],
    },
    description: {
      type: String,
      required: true,
    },
    teachers: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "3 months",
    },
  },
  { timestamps: true },
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
