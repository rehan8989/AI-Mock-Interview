from fastapi import FastAPI
from pydantic import BaseModel

from services.llm_service import (
    analyze_job_description,
    generate_mcqs,
    generate_answer_feedback,
)

app = FastAPI()


class JobDescriptionRequest(BaseModel):
    jobDescription: str


class AnswerFeedbackRequest(BaseModel):
    question: str
    correctAnswer: str


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "AI service is running",
    }


@app.post("/generate")
def generate_assessment(data: JobDescriptionRequest):

    skills = analyze_job_description(data.jobDescription)

    questions = generate_mcqs(
        data.jobDescription,
        skills
    )

    return {
        "success": True,
        "skills": skills,
        "questions": questions,
    }


@app.post("/feedback")
def generate_feedback(data: AnswerFeedbackRequest):

    feedback = generate_answer_feedback(
        data.question,
        data.correctAnswer
    )

    return {
        "success": True,
        "feedback": feedback,
    }