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

    print("1. /generate endpoint hit")

    skills = analyze_job_description(data.jobDescription)

    print("2. Skill extraction finished:", skills)

    questions = generate_mcqs(
    data.jobDescription,
    skills
)

    print("3. Question generation finished")

    return {
        "success": True,
        "skills": skills,
        "questions": questions,
    }