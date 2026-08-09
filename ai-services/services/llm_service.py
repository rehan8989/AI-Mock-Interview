import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


# ============================================================
# 1. Environment Setup
# ============================================================

load_dotenv()


# ============================================================
# 2. Pydantic Models
# ============================================================

class JobSkills(BaseModel):
    skills: list[str] = Field(
        description="Technical skills and technologies required by the job description"
    )


class MCQ(BaseModel):
    question: str
    options: list[str]
    correctAnswer: str
    skill: str


class MCQResponse(BaseModel):
    questions: list[MCQ] = Field(
        description="Exactly 5 multiple-choice interview questions"
    )


# ============================================================
# 3. LLM Setup
# ============================================================

llm = ChatOpenAI(
    model="google/gemma-4-26b-a4b-it:free",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


# ============================================================
# 4. Structured LLMs
# ============================================================

structured_llm = llm.with_structured_output(JobSkills)

mcq_llm = llm.with_structured_output(MCQResponse)


# ============================================================
# 5. Analyze Job Description
# ============================================================

def analyze_job_description(job_description):

    prompt = f"""
    Analyze the following job description.

    Identify the important technical skills, technologies,
    frameworks, programming languages, databases, and tools
    required for this role.

    Return only the relevant technical skills.

    Job Description:
    {job_description}
    """

    response = structured_llm.invoke(prompt)

    return response.skills


# ============================================================
# 6. Generate MCQs
# ============================================================

def generate_mcqs(skills):

    prompt = f"""
    Generate exactly 5 multiple-choice questions based on these
    technical skills:

    {skills}

    Requirements:
    - Each question must have exactly 4 options.
    - Only one option must be correct.
    - Include the correct answer.
    - Identify which skill the question tests.
    - Questions should be suitable for a technical job interview.
    - Do not include explanations.
    """

    response = mcq_llm.invoke(prompt)

    return response.questions


# ============================================================
# 7. Test Job Description
# ============================================================

job_description = """
We are looking for a Software Engineer with experience in React,
Node.js, Express, MongoDB, REST APIs and AWS.

The candidate should have strong JavaScript knowledge and
experience building scalable web applications.
"""


# ============================================================
# 8. Test AI Pipeline
# ============================================================

skills = analyze_job_description(job_description)

print("\nExtracted Skills:")
print(skills)


questions = generate_mcqs(skills)

print("\nGenerated MCQs:")

for question in questions:
    print("\nQuestion:", question.question)
    print("Options:", question.options)
    print("Correct Answer:", question.correctAnswer)
    print("Skill:", question.skill)