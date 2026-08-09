import mongoose from "mongoose";
import { Schema } from "mongoose";


const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    required: true,
  },

  correctAnswer: {
    type: String,
    required: true,
  },

  skill: {
    type: String,
    required: true,
  },

  userAnswer: {
    type: String,
    default: "",
  },

  score: {
    type: Number,
    default: 0,
  },

  aiFeedback: {
    type: String,
    default: "",
  },
});


const interviewSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    extractedSkills: {
      type: [String],
      default: [],
    },

    questions: [questionSchema],

    totalScore: {
      type: Number,
      default: 0,
    },

    overallFeedback: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);


export default mongoose.model("Interview", interviewSchema);