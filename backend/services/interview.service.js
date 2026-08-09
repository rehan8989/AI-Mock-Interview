import axios from "axios";
import Interview from "../models/interview.model.js";

export const generateInterview = async (data) => {

  const { jobDescription } = data;

  // Send the job description to the Python AI service
  const aiResponse = await axios.post(
    "http://localhost:8000/generate",
    {
      jobDescription,
    }
  );

  // Get the data returned by Python
  const { skills, questions } = aiResponse.data;

  // Save the generated assessment in MongoDB
  const interview = await Interview.create({
    jobDescription,
    extractedSkills: skills,

    questions: questions.map((question) => ({
      questionText: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      skill: question.skill,
    })),
  });

  return {
    success: true,
    interview,
  };
};