import { useEffect, useState } from "react";
import api from "../services/api";

import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock3,
    MessageSquare,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Evaluating from "./Evaluating";

import "./Interview.css";


function Interview() {

    const location = useLocation();
    const navigate = useNavigate();

    const interview = location.state?.interview;


    // =========================================================
    // STATE
    // =========================================================

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState([]);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [evaluationComplete, setEvaluationComplete] =
        useState(false);

    // Timer
    const [elapsedSeconds, setElapsedSeconds] =
        useState(0);


    // =========================================================
    // INTERVIEW TIMER
    // =========================================================

    useEffect(() => {

        // Do not start timer if interview doesn't exist
        if (!interview) {
            return;
        }

        const timer = setInterval(() => {

            setElapsedSeconds(
                (previousSeconds) =>
                    previousSeconds + 1
            );

        }, 1000);


        // Cleanup timer when leaving interview
        return () => {

            clearInterval(timer);

        };

    }, [interview]);


    // =========================================================
    // FORMAT TIMER
    // =========================================================

    const formatTime = (seconds) => {

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };


    // =========================================================
    // INTERVIEW NOT FOUND
    // =========================================================

    if (
        !interview ||
        !interview.questions?.length
    ) {

        return (
            <div className="interview-error-page">

                <div className="interview-error-card">

                    <h1>
                        Interview Not Found
                    </h1>

                    <p>
                        We couldn't find an active interview.
                        Please generate a new interview first.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/job-description")
                        }
                    >
                        Go to Job Description
                    </button>

                </div>

            </div>
        );
    }


    // =========================================================
    // INTERVIEW DATA
    // =========================================================

    const questions =
        interview.questions;

    const totalQuestions =
        questions.length;

    const question =
        questions[currentQuestion];

    const selectedAnswer =
        answers[currentQuestion] || "";


    // =========================================================
    // SELECT ANSWER
    // =========================================================

    const handleSelectAnswer = (option) => {

        setAnswers(
            (previousAnswers) => {

                const updatedAnswers = [
                    ...previousAnswers,
                ];

                updatedAnswers[currentQuestion] =
                    option;

                return updatedAnswers;
            }
        );
    };


    // =========================================================
    // PREVIOUS QUESTION
    // =========================================================

    const handlePrevious = () => {

        if (currentQuestion === 0) {
            return;
        }

        setCurrentQuestion(
            (previous) =>
                previous - 1
        );
    };


    // =========================================================
    // NEXT QUESTION / SUBMIT
    // =========================================================

    const handleNext = async () => {

        // -----------------------------------------------------
        // Require an answer
        // -----------------------------------------------------

        if (!selectedAnswer) {
            return;
        }


        // -----------------------------------------------------
        // Move to next question
        // -----------------------------------------------------

        if (
            currentQuestion <
            totalQuestions - 1
        ) {

            setCurrentQuestion(
                (previous) =>
                    previous + 1
            );

            return;
        }


        // -----------------------------------------------------
        // Last question → Submit
        // -----------------------------------------------------

        try {

            console.log(
                "Submitting interview..."
            );


            // -------------------------------------------------
            // Format answers
            // -------------------------------------------------

            const formattedAnswers =
                questions.map(
                    (question, index) => ({

                        questionId:
                            question._id,

                        answer:
                            answers[index],

                    })
                );


            console.log(
                "Answers being submitted:",
                formattedAnswers
            );


            console.log(
                "Time taken:",
                formatTime(elapsedSeconds)
            );


            // -------------------------------------------------
            // Show evaluation screen
            // -------------------------------------------------

            setIsSubmitting(true);

            setEvaluationComplete(false);


            console.log(
                "Sending evaluation request..."
            );


            // -------------------------------------------------
            // Send evaluation request
            // -------------------------------------------------

            const response =
                await api.post(
                    "http://localhost:5000/api/interview/evaluate",
                    {
                        interviewId:
                            interview._id,

                        answers:
                            formattedAnswers,
                    }
                );


            // -------------------------------------------------
            // Backend response
            // -------------------------------------------------

            console.log(
                "Evaluation response:",
                response.data
            );


            // -------------------------------------------------
            // Mark evaluation complete
            // -------------------------------------------------

            setEvaluationComplete(true);


            // -------------------------------------------------
            // Give Evaluating screen time to reach 100%
            // -------------------------------------------------

            await new Promise(
                (resolve) =>
                    setTimeout(
                        resolve,
                        700
                    )
            );


            // -------------------------------------------------
            // Navigate to Results
            // -------------------------------------------------

            navigate(
                "/results",
                {
                    state: {

                        results:
                            response.data,

                        interview:
                            interview,

                        elapsedSeconds:
                            elapsedSeconds,

                    },
                }
            );

        } catch (error) {

            console.error(
                "Interview evaluation failed:",
                error
            );


            // -------------------------------------------------
            // Reset evaluation state
            // -------------------------------------------------

            setIsSubmitting(false);

            setEvaluationComplete(false);

        }
    };


    // =========================================================
    // EVALUATING SCREEN
    // =========================================================

    if (isSubmitting) {

        return (
            <Evaluating
                evaluationComplete={
                    evaluationComplete
                }
            />
        );
    }


    // =========================================================
    // INTERVIEW PAGE
    // =========================================================

    return (

        <div className="interview-page">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="interview-main">

                <div className="interview-container">


                    {/* =========================================
                        INTERVIEW HEADER
                    ========================================= */}

                    <header className="interview-header">


                        {/* -------------------------------------
                            BRAND
                        ------------------------------------- */}

                        <div className="mockai-brand">

                            <div className="mockai-logo">

                                <MessageSquare
                                    size={20}
                                />

                                <span>
                                    AI
                                </span>

                            </div>


                            <span className="mockai-name">

                                Mock
                                <span>
                                    AI
                                </span>

                            </span>

                        </div>


                        {/* -------------------------------------
                            TIMER + QUESTION COUNTER
                        ------------------------------------- */}

                        <div className="interview-header-right">


                            {/* TIMER */}

                            <div className="interview-timer">

                                <Clock3
                                    size={15}
                                />

                                <span>
                                    {formatTime(
                                        elapsedSeconds
                                    )}
                                </span>

                            </div>


                            {/* QUESTION COUNTER */}

                            <div className="interview-counter">

                                Interview{" "}
                                {currentQuestion + 1}{" "}
                                /{" "}
                                {totalQuestions}

                            </div>

                        </div>

                    </header>


                    {/* =========================================
                        QUESTION PROGRESS
                    ========================================= */}

                    <div className="question-progress">

                        {questions.map(
                            (_, index) => (

                                <div
                                    key={index}
                                    className={`progress-segment ${
                                        index <=
                                        currentQuestion
                                            ? "progress-active"
                                            : ""
                                    }`}
                                />

                            )
                        )}

                    </div>


                    {/* =========================================
                        QUESTION CONTENT
                    ========================================= */}

                    <main className="question-content">


                        <div className="question-number">

                            Question{" "}
                            {currentQuestion + 1}

                        </div>


                        <h1 className="question-text">

                            {question.questionText}

                        </h1>


                        {/* =====================================
                            OPTIONS
                        ===================================== */}

                        <div className="options-container">

                            {question.options.map(
                                (
                                    option,
                                    index
                                ) => {

                                    const letter =
                                        String.fromCharCode(
                                            65 + index
                                        );

                                    const selected =
                                        selectedAnswer ===
                                        option;


                                    return (

                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() =>
                                                handleSelectAnswer(
                                                    option
                                                )
                                            }
                                            className={`option-card ${
                                                selected
                                                    ? "option-selected"
                                                    : ""
                                            }`}
                                        >


                                            <div
                                                className={`option-letter ${
                                                    selected
                                                        ? "letter-selected"
                                                        : ""
                                                }`}
                                            >

                                                {selected ? (

                                                    <Check
                                                        size={18}
                                                    />

                                                ) : (

                                                    letter

                                                )}

                                            </div>


                                            <span className="option-text">

                                                {option}

                                            </span>


                                        </button>

                                    );

                                }
                            )}

                        </div>

                    </main>


                    {/* =========================================
                        FOOTER
                    ========================================= */}

                    <footer className="question-footer">

                        <div className="footer-line" />


                        <div className="footer-actions">


                            {/* =================================
                                PREVIOUS
                            ================================= */}

                            <button
                                type="button"
                                onClick={
                                    handlePrevious
                                }
                                disabled={
                                    currentQuestion ===
                                    0
                                }
                                className="previous-button"
                            >

                                <ArrowLeft
                                    size={18}
                                />

                                Previous

                            </button>


                            {/* =================================
                                STATUS
                            ================================= */}

                            <span className="answer-status">

                                {selectedAnswer

                                    ? "Answer selected"

                                    : "Select an answer to continue"

                                }

                            </span>


                            {/* =================================
                                NEXT / SUBMIT
                            ================================= */}

                            <button
                                type="button"
                                onClick={
                                    handleNext
                                }
                                disabled={
                                    !selectedAnswer
                                }
                                className="next-button"
                            >

                                {currentQuestion ===
                                totalQuestions - 1

                                    ? "Submit Interview"

                                    : "Next Question"

                                }

                                <ArrowRight
                                    size={19}
                                />

                            </button>


                        </div>

                    </footer>


                </div>

            </main>


            {/* =================================================
                TRUST SECTION
            ================================================= */}

            <section className="interview-trust-section">

                <div className="interview-trust-content">

                    <div className="interview-trust-icon">

                        <Check
                            size={14}
                        />

                    </div>


                    <span>

                        Your answers are used only to
                        evaluate your personalized interview

                    </span>

                </div>

            </section>


        </div>
    );
}


export default Interview;