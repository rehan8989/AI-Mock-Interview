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
        description="Important skills, competencies, technologies, tools, and knowledge areas required for the job"
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

Identify the most important skills, competencies, knowledge areas,
technologies, tools, and responsibilities required for this role.

The role may be technical or non-technical.

For technical roles, include things such as:
- programming languages
- frameworks
- databases
- cloud platforms
- APIs
- development tools

For non-technical roles, include things such as:
- communication
- customer service
- problem solving
- leadership
- negotiation
- conflict resolution
- sales
- teamwork

Only include skills that are actually relevant to the job description.
Do not invent unrelated technical skills.

Job Description:
{job_description}
"""

    response = structured_llm.invoke(prompt)

    return response.skills


# ============================================================
# 6. Generate MCQs
# ============================================================

def generate_mcqs(job_description, skills):

    prompt = f"""
Generate exactly 5 multiple-choice interview questions based on
the following job description and extracted skills.

Job Description:
{job_description}

Extracted Skills and Competencies:
{skills}

Requirements:

- Generate questions that are directly relevant to the job description.
- Use the extracted skills as the main areas to test.
- Consider the industry, responsibilities, and context described in the job description.
- The questions may be technical or non-technical depending on the role.
- Do not introduce unrelated technologies, programming languages,
  databases, or technical concepts.
- Each question must have exactly 4 options.
- Only one option must be correct.
- The correctAnswer MUST be exactly one of the 4 options.
- correctAnswer MUST NOT be the question text.
- correctAnswer MUST match the selected option exactly, including wording.
- Do not modify or paraphrase the correct answer after selecting it.
- Identify which skill or competency the question tests.
- Questions should be suitable for an actual job interview.
- Questions should test practical understanding rather than obscure trivia.
- Do not include explanations.

Return exactly 5 questions.
"""

    response = mcq_llm.invoke(prompt)

    for question in response.questions:
        if len(question.options) != 4:
            raise ValueError("A question must have exactly 4 options.")

        if question.correctAnswer not in question.options:
            raise ValueError(
                f"Correct answer is not one of the options: {question.question}"
            )

    return response.questions