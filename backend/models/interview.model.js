import mongoose from "mongoose";
import { Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  userAnswer: { type: String, default: "" },
  score: { type: Number, default: 0 },
  aiFeedback: { type: String, default: "" },
});

const interviewSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "DSA", "System Design", "Fullstack"],
    },
    questions: [questionSchema],
    totalScore: { type: Number, default: 0 },
    overallFeedback: { type: String, default: "" },
  },
  { timestamps: true },
);


export default mongoose.model("Interview", interviewSchema);