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
            "job description suitable for generating a professional interview"
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
    options: list[str]
    correctAnswer: str
    skill: str


class MCQResponse(BaseModel):
    questions: list[MCQ] = Field(
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
Determine whether the following input is a valid job description
that can be used to create a professional job interview.

The input must describe a legitimate professional role in enough
detail to create meaningful interview questions.

IMPORTANT:

A profession name alone is NOT a valid job description.

Examples that MUST be rejected:

- "Actress"
- "Cook"
- "Software Engineer"
- "Teacher"
- "Doctor"

A vague statement about a profession is also NOT sufficient.

Examples that MUST be rejected:

- "I am an actress"
- "I am a cook"
- "I am a software engineer"
- "Cook with knowledge of Italian food"
- "Actress with 5 years of experience"
- "Developer with knowledge of Python"
- "Chef with experience"

The input must provide meaningful professional context.

A valid job description should contain enough information about
the role to determine meaningful interview topics. This may include:

- responsibilities
- duties
- required skills
- required knowledge
- qualifications
- tools or technologies
- work activities
- professional competencies
- job objectives
- work environment
- expected tasks

The profession does NOT have to be technical.

Legitimate professional roles such as:

- software engineer
- actress
- actor
- chef
- teacher
- nurse
- lawyer
- photographer
- mechanic
- architect
- sales professional
- designer
- fisherman

are valid when the input actually describes the professional role
and provides enough meaningful information about the work.

For example, this SHOULD be accepted:

"Frontend Developer responsible for building responsive web
applications using React and JavaScript, integrating REST APIs,
writing reusable components, fixing bugs, and collaborating with
backend developers."

This SHOULD be accepted:

"Chef responsible for preparing Italian cuisine, managing kitchen
operations, maintaining food safety standards, controlling
ingredients, preparing menus, and supervising kitchen staff."

This SHOULD be accepted:

"Actress responsible for preparing scripted roles for film and
television productions, attending auditions and rehearsals,
collaborating with directors and cast members, studying characters,
and adapting performances based on direction."

This SHOULD be rejected:

"I am a banana"

This SHOULD be rejected:

"banana"

This SHOULD be rejected:

"hello"

This SHOULD be rejected:

"I like football"

This SHOULD be rejected:

"I want to become rich"

This SHOULD be rejected:

"Actress"

This SHOULD be rejected:

"I am an actress"

This SHOULD be rejected:

"Actress with 5 years of experience"

This SHOULD be rejected:

"Cook with knowledge of Italian food"

This SHOULD be rejected:

"Software engineer with Python experience"

This SHOULD be rejected:

"Teacher with good communication skills"

The important distinction is:

A PERSON describing themselves is not automatically a job description.

A PROFESSION NAME is not automatically a job description.

A PROFESSION + one vague skill or experience statement is not
automatically a job description.

The input must contain enough professional context to generate
meaningful interview questions specific to that role.

Also reject:

- random objects
- animals
- foods
- nonsense
- casual conversation
- personal interests
- hobbies
- generic career aspirations
- generic statements about someone's abilities
- extremely vague professional statements
- obviously contradictory or nonsensical claims

Return is_valid = true ONLY when the input is sufficiently detailed
and can reasonably be used as the basis for a professional interview.

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

- Each question must have exactly 4 options.
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

Return exactly 10 questions.
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