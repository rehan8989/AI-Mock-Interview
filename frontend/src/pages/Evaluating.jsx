import { useEffect, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";

import Navbar from "../components/common/Navbar";

import "./Evaluating.css";


function Evaluating({ evaluationComplete = false }) {

    const steps = [
        "Reviewing Answers",
        "Checking Correctness",
        "Generating AI Feedback",
        "Preparing Results",
    ];


    const [progress, setProgress] = useState(5);
    const [activeStep, setActiveStep] = useState(0);


    // =========================================================
    // PROGRESS ANIMATION
    // =========================================================

    useEffect(() => {

        // -----------------------------------------------------
        // Evaluation completed
        // -----------------------------------------------------

        if (evaluationComplete) {

            setActiveStep(3);
            setProgress(100);

            return;
        }


        // -----------------------------------------------------
        // Normal evaluation
        //
        // Progress slowly moves toward 90%.
        // It will never claim 100% until backend finishes.
        // -----------------------------------------------------

        const interval = setInterval(() => {

            setProgress((previousProgress) => {

                if (previousProgress >= 90) {
                    return 90;
                }

                // Slower as we approach 90
                if (previousProgress < 30) {
                    return previousProgress + 1.5;
                }

                if (previousProgress < 60) {
                    return previousProgress + 0.8;
                }

                return previousProgress + 0.35;

            });

        }, 100);


        return () => {
            clearInterval(interval);
        };

    }, [evaluationComplete]);


    // =========================================================
    // STEP ANIMATION
    // =========================================================

    useEffect(() => {

        if (evaluationComplete) {
            setActiveStep(3);
            return;
        }


        // Move through the first three stages.
        // Last stage becomes active only when evaluation finishes.

        const timers = [

            setTimeout(() => {
                setActiveStep(1);
            }, 1200),

            setTimeout(() => {
                setActiveStep(2);
            }, 2800),

        ];


        return () => {
            timers.forEach(clearTimeout);
        };

    }, [evaluationComplete]);


    return (
        <div className="evaluating-page">

            <Navbar />


            <main className="evaluating-main">

                <div className="evaluating-card">


                    {/* =================================================
                        ROBOT / ICON
                    ================================================= */}

                    <div className="evaluation-icon">

                        <div className="evaluation-icon-inner">
                            AI
                        </div>

                    </div>


                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <h1>
                        Evaluating Your Interview...
                    </h1>


                    <p>
                        We're reviewing your answers and
                        generating personalized AI feedback.
                    </p>


                    {/* =================================================
                        PROGRESS
                    ================================================= */}

                    <div className="evaluation-progress">

                        <div className="evaluation-progress-track">

                            <div
                                className="evaluation-progress-fill"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>


                        <div className="evaluation-progress-percentage">
                            {Math.round(progress)}%
                        </div>

                    </div>


                    {/* =================================================
                        STEPS
                    ================================================= */}

                    <div className="evaluation-steps">

                        {steps.map((step, index) => {

                            const completed =
                                index < activeStep ||
                                evaluationComplete;

                            const active =
                                index === activeStep &&
                                !evaluationComplete;


                            return (
                                <div
                                    key={step}
                                    className="evaluation-step"
                                >

                                    {/* ---------------------------------
                                        CIRCLE
                                    --------------------------------- */}

                                    <div
                                        className={`
                                            evaluation-step-circle

                                            ${
                                                completed
                                                    ? "evaluation-step-completed"
                                                    : ""
                                            }

                                            ${
                                                active
                                                    ? "evaluation-step-active"
                                                    : ""
                                            }
                                        `}
                                    >

                                        {completed ? (

                                            <Check size={14} />

                                        ) : active ? (

                                            <LoaderCircle
                                                size={15}
                                                className="animate-spin"
                                            />

                                        ) : (

                                            <span />

                                        )}

                                    </div>


                                    {/* ---------------------------------
                                        LABEL
                                    --------------------------------- */}

                                    <span
                                        className={`
                                            evaluation-step-label

                                            ${
                                                completed
                                                    ? "evaluation-step-label-completed"
                                                    : ""
                                            }

                                            ${
                                                active
                                                    ? "evaluation-step-label-active"
                                                    : ""
                                            }
                                        `}
                                    >
                                        {step}
                                    </span>

                                </div>
                            );

                        })}

                    </div>


                    {/* =================================================
                        BOTTOM MESSAGE
                    ================================================= */}

                    <div className="evaluation-message">

                        <div className="evaluation-check">

                            <Check size={14} />

                        </div>

                        <span>

                            {evaluationComplete
                                ? "Evaluation complete. Preparing your results..."
                                : "Please wait while we prepare your interview results."
                            }

                        </span>

                    </div>

                </div>

            </main>

        </div>
    );
}


export default Evaluating;