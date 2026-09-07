import axios from "axios";
import Interview from "../models/interview.model.js";

export const generateInterview = async (data) => {
  const { jobDescription, userId } = data;

  try {
    // Send the job description to the Python AI service
    const aiResponse = await axios.post(
      "http://localhost:8000/generate",
      {
        jobDescription,
      }
    );

    // Get the data returned by Python
    const { skills, questions } = aiResponse.data;

    console.log("AI skills:", skills);
    console.log("AI questions:", questions);

    // Save the generated assessment in MongoDB
    const interview = await Interview.create({
      userId: userId,
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
  } catch (error) {
    // --------------------------------------------------------
    // Handle invalid job description from Python AI service
    // --------------------------------------------------------

    if (
      error.response &&
      error.response.status === 400
    ) {
      const validationError = new Error(
        error.response.data?.detail ||
        "Please enter a proper job description with enough details about the role, responsibilities, skills, tools, or requirements."
      );

      // Tell the route this is a user/input error
      validationError.status = 400;

      throw validationError;
    }

    // --------------------------------------------------------
    // Other generation errors
    // --------------------------------------------------------

    console.error(
      "Interview generation service error:",
      error.message
    );

    const generationError = new Error(
      "We couldn't generate your interview right now. Please try again."
    );

    generationError.status = 500;

    throw generationError;
  }
};


export const evaluateInterview = async (data) => {
  const { interviewId, answers, userId } = data;

  const interview = await Interview.findById(interviewId);

  if (!interview) {
    throw new Error("Interview not found");
  }

  if (interview.userId.toString() !== userId) {
    throw new Error(
      "You are not authorized to evaluate this interview"
    );
  }

  let totalScore = 0;

  for (const answer of answers) {
    const question = interview.questions.id(
      answer.questionId
    );

    if (!question) {
      continue;
    }

    question.userAnswer = answer.answer;

    if (answer.answer === question.correctAnswer) {
      question.score = 2;
      totalScore += 2;
    } else {
      question.score = 0;
    }

    const aiResponse = await axios.post(
      "http://localhost:8000/feedback",
      {
        question: question.questionText,
        correctAnswer: question.correctAnswer,
      }
    );

    question.aiFeedback = aiResponse.data.feedback;
  }

  interview.totalScore = totalScore;
  interview.isCompleted = true;

  await interview.save();

  return {
    success: true,
    message: "Interview evaluated successfully",
    totalScore,
    questions: interview.questions,
  };
};


export const getInterviewHistory = async (userId) => {
  const interviews = await Interview.find({
    userId: userId,
    isCompleted: true,
  }).sort({ createdAt: -1 });

  return {
    success: true,
    interviews,
  };
};