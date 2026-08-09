from fastapi import FastAPI
from pydantic import BaseModel

from services.llm_service import (
    analyze_job_description,
    generate_mcqs,
)


app = FastAPI()


class JobDescriptionRequest(BaseModel):
    jobDescription: str


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "AI service is running",
    }


@app.post("/generate")
def generate_assessment(data: JobDescriptionRequest):

    skills = analyze_job_description(data.jobDescription)

    questions = generate_mcqs(skills)

    return {
        "success": True,
        "skills": skills,
        "questions": questions,
    }