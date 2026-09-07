# MockAI

> GPT-powered mock assessment platform that generates personalized MCQs from job descriptions and provides AI-generated feedback.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://ai-mock-interview-beta-six.vercel.app/)

---

## 📌 Overview

MockAI is a web-based mock assessment platform designed to help users practice for job-specific assessments.

Users provide a job description, and MockAI analyzes the requirements to identify relevant skills and generates a personalized 10-question multiple-choice assessment.

After completing the assessment, the platform automatically evaluates the answers, calculates the score, and uses a GPT model to generate feedback for each question.

Completed assessments are stored securely and can be accessed later through the assessment history.

---

## ✨ Features

- 🔐 User registration and login
- 🔑 JWT-based authentication
- 📄 Job description validation
- 🧠 AI-based skill extraction
- 📝 Personalized 10-question MCQ generation
- ✅ Automatic answer evaluation
- 💬 AI-generated feedback
- 📊 Assessment scoring and results
- 🕘 Assessment history
- 👤 User profile
- 🔒 Protected routes
- 💾 Persistent assessment data

---

## 🧠 How It Works

```text
Job Description
       ↓
Job Description Validation
       ↓
Skill Extraction
       ↓
MCQ Generation
       ↓
10-Question Assessment
       ↓
User Answers
       ↓
Answer Evaluation
       ↓
AI-Generated Feedback
       ↓
Results
       ↓
Assessment History
```

### 1. Provide a Job Description

The user enters a job description containing information about the role, responsibilities, required skills, tools, and qualifications.

### 2. Extract Relevant Skills

The AI service analyzes the job description and identifies the skills relevant to the assessment.

### 3. Generate the Assessment

A GPT model generates a personalized assessment containing 10 multiple-choice questions based on the job description and extracted skills.

Each question contains four answer options and a correct answer.

### 4. Complete the Assessment

The user answers the generated questions through the React frontend.

### 5. Evaluate the Answers

The backend compares the submitted answers with the correct answers stored for the assessment and calculates the total score.

### 6. Generate AI Feedback

The AI service generates feedback for each question to help the user understand the correct answer.

### 7. View Results and History

The completed assessment, score, answers, and feedback are stored in MongoDB and can be accessed through the user's assessment history.

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │    React + Vite     │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                              HTTP + JWT
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Node.js + Express  │
                         │      Backend        │
                         └───────┬───────┬─────┘
                                 │       │
                         MongoDB │       │ HTTP
                                 │       │
                                 ▼       ▼
                       ┌────────────┐  ┌────────────────┐
                       │  MongoDB   │  │  FastAPI AI    │
                       │   Atlas    │  │    Service     │
                       └────────────┘  └───────┬────────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  OpenRouter  │
                                        │   GPT Model  │
                                        └──────────────┘
```

### Application Components

**Frontend**

Built with React and Vite. Handles the user interface, authentication state, assessment interaction, results, history, and profile pages.

**Backend**

Built with Node.js and Express. Handles authentication, API requests, assessment persistence, answer evaluation, and communication with the AI service.

**AI Service**

Built with Python and FastAPI. Handles job description analysis, skill extraction, MCQ generation, and AI-generated feedback.

**Database**

MongoDB stores users, assessments, questions, answers, scores, and feedback.

**LLM**

The AI service communicates with a GPT model through OpenRouter.

---

## 🤖 AI Pipeline

MockAI uses a separate FastAPI service for AI-related processing.

### Assessment Generation

```text
Job Description
       ↓
Validation
       ↓
Skill Extraction
       ↓
Question Generation
       ↓
10 MCQs
```

The generated assessment contains:

- Question text
- Four answer options
- Correct answer
- Associated skill

### AI Feedback

```text
Question + Correct Answer
            ↓
     FastAPI AI Service
            ↓
         GPT Model
            ↓
     AI-Generated Feedback
```

---

## 🔐 Authentication

MockAI uses JWT-based authentication for protected resources.

```text
User Registration
       ↓
Password Hashing with bcrypt
       ↓
User Login
       ↓
JWT Generated
       ↓
Token Stored by Frontend
       ↓
Bearer Token Sent with API Requests
       ↓
JWT Verification Middleware
       ↓
Authenticated User
```

Protected backend routes obtain the authenticated user's ID from the verified JWT.

This allows assessment data and assessment history to remain associated with the authenticated user.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Axios

### AI Service

- Python
- FastAPI
- Pydantic
- LangChain
- LangChain OpenAI
- OpenRouter
- GPT Model

### Deployment

- Vercel — Frontend
- Render — Backend
- Render — AI Service
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
AI-Mock-Interview/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── ai-services/
│   ├── services/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

Make sure you have:

- Node.js
- npm
- Python 3
- MongoDB Atlas account
- OpenRouter API key

### 1. Clone the Repository

```bash
git clone https://github.com/rehan8989/AI-Mock-Interview.git
cd AI-Mock-Interview
```

### 2. Start the Backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the AI Service

Open another terminal:

```bash
cd ai-services
```

Create a virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
uvicorn main:app --reload --port 8000
```

The AI service runs on:

```text
http://localhost:8000
```

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🔑 Environment Variables

### Frontend

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
```

### Backend

Create:

```text
backend/.env
```

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://localhost:8000
```

### AI Service

Create:

```text
ai-services/.env
```

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

> **Never commit `.env` files or expose API keys, database credentials, or JWT secrets in the repository.**

---

## 🌐 Deployment

MockAI uses a distributed deployment architecture:

```text
React Frontend
      ↓
    Vercel
      ↓
Node.js + Express Backend
      ↓
    Render
      ↓
FastAPI AI Service
      ↓
    Render
      ↓
OpenRouter → GPT Model
```

MongoDB Atlas is used as the production database.

### Production Services

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| AI Service | Render |
| Database | MongoDB Atlas |

---

## 🚀 Live Demo

[Launch MockAI](https://ai-mock-interview-beta-six.vercel.app/)

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- Improved skill prioritization
- Better difficulty calibration
- More robust AI-generated question validation
- Additional assessment formats

---

## 👨‍💻 Author

**Rehan Waghoo**

**MockAI — Version 1.0.0**
