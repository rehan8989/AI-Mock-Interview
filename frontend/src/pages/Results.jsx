import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  Clock3,
  RotateCcw,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import "./Results.css";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results;
  const interview = location.state?.interview;
  const elapsedSeconds = location.state?.elapsedSeconds || 0;

  // This tells us whether the user arrived here from History.
  const fromHistory = location.state?.fromHistory === true;

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  // =========================================================
  // RESULTS NOT FOUND
  // =========================================================

  if (!results || !interview) {
    return (
      <div className="results-error-page">
        <div className="results-error-card">
          <h1>Results Not Found</h1>

          <p>
            We couldn't find the results for this interview. Please start a new
            interview.
          </p>

          <button
            type="button"
            onClick={() => navigate("/job-description")}
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // DATA
  // =========================================================

  const questions = results.questions || [];

  const totalQuestions = questions.length;

  const maximumScore = totalQuestions * 2;

  const totalScore = results.totalScore || 0;

  // =========================================================
  // SCORE
  // =========================================================

  const percentage =
    maximumScore === 0 ? 0 : Math.round((totalScore / maximumScore) * 100);

  // =========================================================
  // CORRECT / INCORRECT
  // =========================================================

  const correctCount = questions.filter(
    (question) => question.score > 0,
  ).length;

  const incorrectCount = totalQuestions - correctCount;

  // =========================================================
  // EXPAND QUESTION
  // =========================================================

  const handleQuestionClick = (index) => {
    setExpandedQuestion((previous) =>
      previous === index ? null : index,
    );
  };

  // =========================================================
  // BACK BUTTON
  // =========================================================

  const handleBack = () => {
    if (fromHistory) {
      navigate("/history");
    } else {
      navigate("/");
    }
  };

  // =========================================================
  // RETAKE
  // =========================================================

  const handleRetake = () => {
    navigate("/job-description");
  };

  return (
    <div className="results-page">

      {/* =================================================
                NAVBAR
            ================================================= */}

      <Navbar />

      {/* =================================================
                MAIN
            ================================================= */}

      <main className="results-main">
        <div className="results-container">

          {/* =================================================
                        BACK BUTTON
                    ================================================= */}

          <button
            type="button"
            className="results-back-button"
            onClick={handleBack}
          >
            <ArrowLeft size={17} />

            {fromHistory ? "Back to History" : "Back to Home"}
          </button>


          {/* =================================================
                        HEADER
                    ================================================= */}

          <section className="results-header">
            <div className="results-success-icon">
              <Check size={30} />
            </div>

            <h1>Interview Completed!</h1>

            <p>
              Great job! Here's how you performed in your interview.
            </p>
          </section>


          {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

          <section className="results-summary">

            {/* OVERALL SCORE */}

            <div className="result-summary-card">
              <div className="summary-icon summary-score-icon">
                <Check size={20} />
              </div>

              <div>
                <div className="summary-value">
                  {percentage}%
                </div>

                <div className="summary-label">
                  Overall Score
                </div>
              </div>
            </div>


            {/* CORRECT */}

            <div className="result-summary-card">
              <div className="summary-icon summary-correct-icon">
                <Check size={20} />
              </div>

              <div>
                <div className="summary-value">
                  {correctCount}
                </div>

                <div className="summary-label">
                  Correct
                </div>
              </div>
            </div>


            {/* INCORRECT */}

            <div className="result-summary-card">
              <div className="summary-icon summary-incorrect-icon">
                <X size={20} />
              </div>

              <div>
                <div className="summary-value">
                  {incorrectCount}
                </div>

                <div className="summary-label">
                  Incorrect
                </div>
              </div>
            </div>


            {/* TIME */}

            <div className="result-summary-card">
              <div className="summary-icon summary-time-icon">
                <Clock3 size={20} />
              </div>

              <div>
                <div className="summary-value">
                  {formatTime(elapsedSeconds)}
                </div>

                <div className="summary-label">
                  Time Taken
                </div>
              </div>
            </div>

          </section>


          {/* =================================================
                        JOB DESCRIPTION
                    ================================================= */}

          <section className="results-info-card">

            <div>
              <span className="results-info-label">
                Job Description
              </span>

              <p>
                {interview.jobDescription}
              </p>
            </div>


            {interview.extractedSkills?.length > 0 && (
              <div className="results-skills">

                <span className="results-info-label">
                  Skills Assessed
                </span>

                <div className="skills-list">

                  {interview.extractedSkills
                    .slice(0, 8)
                    .map((skill) => (
                      <span
                        key={skill}
                        className="skill-pill"
                      >
                        {skill}
                      </span>
                    ))}

                </div>

              </div>
            )}

          </section>


          {/* =================================================
                        QUESTIONS
                    ================================================= */}

          <section className="questions-section">

            <div className="questions-section-header">

              <div>
                <h2>
                  All Questions
                </h2>

                <p>
                  Click a question to review your answer and AI feedback.
                </p>
              </div>

              <span className="question-count">
                {totalQuestions} Questions
              </span>

            </div>


            <div className="questions-list">

              {questions.map((question, index) => {

                const correct = question.score > 0;

                const expanded =
                  expandedQuestion === index;

                return (
                  <div
                    key={question._id || index}
                    className={`question-result-item ${
                      expanded
                        ? "question-expanded"
                        : ""
                    }`}
                  >

                    {/* =================================
                        QUESTION ROW
                    ================================= */}

                    <button
                      type="button"
                      className="question-result-row"
                      onClick={() =>
                        handleQuestionClick(index)
                      }
                    >

                      {/* NUMBER */}

                      <div className="question-index">
                        {index + 1}
                      </div>


                      {/* QUESTION */}

                      <div className="result-question-content">

                        <div className="result-question-text">
                          {question.questionText}
                        </div>

                        <div className="result-question-skill">
                          {question.skill}
                        </div>

                      </div>


                      {/* RESULT */}

                      <div className="result-row-right">

                        {correct ? (
                          <span className="result-badge result-correct">
                            <Check size={13} />
                            Correct
                          </span>
                        ) : (
                          <span className="result-badge result-incorrect">
                            <X size={13} />
                            Incorrect
                          </span>
                        )}

                        <ChevronDown
                          size={19}
                          className={`question-chevron ${
                            expanded
                              ? "question-chevron-open"
                              : ""
                          }`}
                        />

                      </div>

                    </button>


                    {/* =================================
                        EXPANDED DETAILS
                    ================================= */}

                    {expanded && (
                      <div className="question-answer-details">

                        {/* YOUR ANSWER */}

                        <div className="answer-detail-block">

                          <span className="answer-detail-label">
                            Your Answer
                          </span>

                          <div
                            className={`answer-detail-box ${
                              correct
                                ? "answer-correct-box"
                                : "answer-incorrect-box"
                            }`}
                          >

                            <div className="answer-detail-icon">
                              {correct ? (
                                <Check size={16} />
                              ) : (
                                <X size={16} />
                              )}
                            </div>

                            <span>
                              {question.userAnswer ||
                                "Not answered"}
                            </span>

                          </div>

                        </div>


                        {/* CORRECT ANSWER */}

                        <div className="answer-detail-block">

                          <span className="answer-detail-label">
                            Correct Answer
                          </span>

                          <div className="answer-detail-box correct-answer-box">

                            <div className="answer-detail-icon">
                              <Check size={16} />
                            </div>

                            <span>
                              {question.correctAnswer}
                            </span>

                          </div>

                        </div>


                        {/* AI FEEDBACK */}

                        <div className="ai-feedback-block">

                          <div className="ai-feedback-header">

                            <div className="ai-feedback-icon">
                              AI
                            </div>

                            <span>
                              AI Explanation
                            </span>

                          </div>

                          <p>
                            {question.aiFeedback ||
                              "No AI explanation is available for this question."}
                          </p>

                        </div>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </section>


          {/* =================================================
                        RETAKE
                    ================================================= */}

          <section className="results-actions">

            <button
              type="button"
              className="retake-button"
              onClick={handleRetake}
            >
              <RotateCcw size={18} />
              Retake Interview
            </button>

          </section>

        </div>
      </main>


      {/* =================================================
                TRUST SECTION
            ================================================= */}

      <section className="results-trust-section">

        <div className="results-trust-content">

          <div className="results-trust-icon">
            <Check size={14} />
          </div>

          <span>
            Your interview results are securely stored for your review.
          </span>

        </div>

      </section>

    </div>
  );
}

export default Results;