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


class JobDescriptionValidation(BaseModel):
    is_valid: bool = Field(
        description=(
            "Whether the input is a sufficiently detailed and legitimate "
            "job description suitable for generating professional interview questions"
        )
    )

    reason: str = Field(
        description=(
            "A short explanation explaining why the input is valid or invalid"
        )
    )


class JobSkills(BaseModel):
    skills: list[str] = Field(
        description=(
            "Important skills, competencies, technologies, tools, "
            "and knowledge areas required for the job"
        )
    )


class MCQ(BaseModel):
    question: str

    options: list[str] = Field(
        min_length=4,
        max_length=4,
        description="Exactly 4 answer options"
    )

    correctAnswer: str
    skill: str


class MCQResponse(BaseModel):
    questions: list[MCQ] = Field(
        min_length=10,
        max_length=10,
        description="Exactly 10 multiple-choice interview questions"
    )


class AnswerFeedback(BaseModel):
    feedback: str = Field(
        description=(
            "A short explanation of why the correct answer is correct"
        )
    )


# ============================================================
# 3. LLM Setup
# ============================================================

llm = ChatOpenAI(
    model="openai/gpt-oss-20b",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


# ============================================================
# 4. Structured LLMs
# ============================================================

job_validation_llm = llm.with_structured_output(
    JobDescriptionValidation,
    method="json_schema"
)

structured_llm = llm.with_structured_output(
    JobSkills,
    method="json_schema"
)

mcq_llm = llm.with_structured_output(
    MCQResponse,
    method="json_schema"
)

feedback_llm = llm.with_structured_output(
    AnswerFeedback,
    method="json_schema"
)


# ============================================================
# 5. Validate Job Description
# ============================================================


def validate_job_description(job_description):

    prompt = f"""
Determine whether the following input is a legitimate and sufficiently
useful job description for generating professional interview questions.

The goal is to determine whether the input provides enough PROFESSIONAL
CONTEXT about a role.

IMPORTANT:

Do NOT require a specific job-description format.

A job description does NOT need to contain all of the following:

- responsibilities
- duties
- qualifications
- skills
- technologies
- experience
- objectives

It is sufficient if the input provides enough meaningful information
about the professional role through one or more of these areas.

A valid job description may describe:

- the professional role
- responsibilities or duties
- expected tasks
- required skills
- technologies or tools
- qualifications
- required experience
- professional competencies
- work activities
- job objectives
- industry-specific knowledge

For technical roles, a description containing a professional role plus
several relevant technical skills, technologies, or experience requirements
can be valid even if responsibilities are brief or absent.

For non-technical roles, relevant professional skills, duties, experience,
competencies, or work activities can also make the description valid.

The important question is:

"Does this input provide enough professional context to generate meaningful
interview questions for this role?"

------------------------------------------------------------
INPUTS THAT MUST BE REJECTED
------------------------------------------------------------

Reject a profession name alone:

- "Software Engineer"
- "Developer"
- "Teacher"
- "Chef"
- "Photographer"

Reject a profession with almost no useful context:

- "Developer with experience"
- "Software engineer with Python"
- "Teacher with good communication skills"
- "Chef with experience"

Reject random or unrelated inputs:

- "banana"
- "hello"
- "I like football"
- "I want to become rich"
- "Python"
- "React"
- "MongoDB"

Reject casual personal statements that do not provide enough professional
context.

------------------------------------------------------------
INPUTS THAT SHOULD BE ACCEPTED
------------------------------------------------------------

Accept descriptions that provide meaningful professional context.

For example:

"Frontend Developer responsible for building responsive web applications
using React and JavaScript, integrating REST APIs, writing reusable
components, fixing bugs, and collaborating with backend developers."

Accept:

"Backend Developer with strong experience in Node.js, Express.js,
MongoDB, REST APIs, JWT authentication, Git, and asynchronous JavaScript.
The developer will build APIs, manage databases, debug applications,
and work with frontend developers."

Accept:

"React Developer with 3+ years of experience building responsive web
applications using React, JavaScript, HTML, CSS, REST APIs and Git."

Accept:

"Chef responsible for preparing Italian cuisine, managing kitchen
operations, maintaining food safety standards, preparing menus, and
supervising kitchen staff."

Accept:

"Sales professional responsible for generating leads, communicating
with customers, negotiating deals, maintaining client relationships,
and meeting monthly sales targets."

------------------------------------------------------------
IMPORTANT DECISION RULE
------------------------------------------------------------

Be reasonably permissive toward legitimate job descriptions.

Do NOT reject a job description simply because it focuses heavily on
skills, technologies, qualifications, or experience.

Do NOT require the description to explicitly contain responsibilities.

Do NOT reject a technical job description merely because it contains
many technical skills and tools.

Only return is_valid = false when the input is clearly too vague,
irrelevant, nonsensical, or lacks enough professional context to create
meaningful interview questions.

Return is_valid = true when the input provides enough information to
reasonably identify the professional role and generate relevant interview
questions.

Job Description Input:
{job_description}
"""

    response = job_validation_llm.invoke(prompt)

    return response


# ============================================================
# 6. Analyze Job Description
# ============================================================


def analyze_job_description(job_description):

    # --------------------------------------------------------
    # Basic input validation
    # --------------------------------------------------------

    if not job_description:
        raise ValueError(
            "Please enter a job description."
        )

    job_description = job_description.strip()

    if len(job_description) < 30:
        raise ValueError(
            "Please provide a more detailed job description."
        )

    if len(job_description) > 10000:
        raise ValueError(
            "Job description is too long."
        )

    # --------------------------------------------------------
    # AI job-description validation
    # --------------------------------------------------------

    validation = validate_job_description(
        job_description
    )

    if not validation.is_valid:
        raise ValueError(
            validation.reason
        )

    # --------------------------------------------------------
    # Extract skills
    # --------------------------------------------------------

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
# 7. Generate MCQs
# ============================================================


def generate_mcqs(job_description, skills):

    prompt = f"""
Generate exactly 10 multiple-choice interview questions based on
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

MCQ Requirements:

- Generate EXACTLY 10 questions.
- Each question must have EXACTLY 4 options.
- Only one option must be correct.
- First create the 4 options.
- Then select exactly one of those 4 options as the correct answer.
- Copy the selected option EXACTLY into correctAnswer.
- correctAnswer MUST be exactly one of the 4 options.
- correctAnswer MUST NOT be the question text.
- Do not modify, paraphrase, summarize, or regenerate correctAnswer
  after selecting the option.
- correctAnswer must match the selected option exactly, including wording.
- Identify which skill or competency the question tests.
- Questions should be suitable for an actual job interview.
- Questions should test practical understanding rather than obscure trivia.
- Do not include explanations.

Return EXACTLY 10 questions.
Each question must contain EXACTLY 4 options.
"""

    response = mcq_llm.invoke(prompt)

    # ------------------------------------------------------------
    # Validate and normalize every question
    # ------------------------------------------------------------

    if len(response.questions) != 10:
        raise ValueError(
            "The AI did not generate exactly 10 interview questions."
        )

    for question in response.questions:

        # --------------------------------------------------------
        # Validate exactly 4 options
        # --------------------------------------------------------

        if len(question.options) != 4:
            raise ValueError(
                f"A question must have exactly 4 options: "
                f"{question.question}"
            )

        # --------------------------------------------------------
        # Remove accidental whitespace
        # --------------------------------------------------------

        question.options = [
            option.strip()
            for option in question.options
        ]

        question.correctAnswer = (
            question.correctAnswer.strip()
        )

        # --------------------------------------------------------
        # Make sure correctAnswer matches an option
        # --------------------------------------------------------

        if question.correctAnswer not in question.options:

            # Try case-insensitive matching
            matching_option = next(
                (
                    option
                    for option in question.options
                    if option.lower()
                    == question.correctAnswer.lower()
                ),
                None
            )

            if matching_option:

                # Use the exact option text
                # as the correct answer
                question.correctAnswer = matching_option

            else:

                raise ValueError(
                    "Correct answer is not one of the options: "
                    f"{question.question}"
                )

    return response.questions


# ============================================================
# 8. Answer Evaluation
# ============================================================


def generate_answer_feedback(question, correct_answer):

    prompt = f"""
Explain why the correct answer to the following interview question is correct.

Question:
{question}

Correct Answer:
{correct_answer}

Requirements:

- Give a short explanation.
- Explain the concept or reasoning behind the correct answer.
- Keep the explanation easy to understand.
- Do not discuss the candidate's answer.
- Do not provide alternative answers.
- Keep the feedback to 1-2 sentences.
"""

    response = feedback_llm.invoke(prompt)

    return response.feedback