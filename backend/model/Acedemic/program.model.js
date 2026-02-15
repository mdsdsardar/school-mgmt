const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProgramSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
      maxLength: [30, "Your name cannot exceed 30 character."],
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
      default: "4 years",
    },
    //created automatically - CSFTY
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //We will push the teachers that are in charge of the program.
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    //Push the subjects that are in the program when program is created.
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;
