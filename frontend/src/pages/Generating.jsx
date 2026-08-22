import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    Check,
    LoaderCircle,
    RotateCcw,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import robotImage from "../assets/images/interview-loading.png";
import { generateInterview } from "../services/interviewService";

import "./Generating.css";

function Generating() {
    const location = useLocation();
    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState("");

    // Prevent duplicate API calls
    const hasStarted = useRef(false);

    const jobDescription =
        location.state?.jobDescription?.trim();

    useEffect(() => {
        // ---------------------------------------------
        // No JD
        // ---------------------------------------------
        // If someone directly opens /generating,
        // there is no job description to process.
        // So send them back without calling the API.

        if (!jobDescription) {
            navigate("/job-description", {
                replace: true,
            });

            return;
        }

        // ---------------------------------------------
        // Prevent duplicate API calls
        // ---------------------------------------------
        // React StrictMode can run useEffect twice
        // during development.
        //
        // This makes sure generateInterview()
        // is called only once.

        if (hasStarted.current) {
            return;
        }

        hasStarted.current = true;

        // ---------------------------------------------
        // Generate interview
        // ---------------------------------------------

        const generate = async () => {
            try {
                setError("");

                console.log(
                    "Generating interview..."
                );

                // -----------------------------------------
                // Stage 1
                // -----------------------------------------

                setActiveStep(0);
                setProgress(20);

                await new Promise((resolve) =>
                    setTimeout(resolve, 400)
                );

                // -----------------------------------------
                // Stage 2
                // -----------------------------------------

                setActiveStep(1);
                setProgress(40);

                // -----------------------------------------
                // API request
                // -----------------------------------------

                const result =
                    await generateInterview(
                        jobDescription
                    );

                console.log(
                    "Interview generated:",
                    result
                );

                // -----------------------------------------
                // Validate response
                // -----------------------------------------

                if (
                    !result ||
                    !result.success ||
                    !result.interview
                ) {
                    throw new Error(
                        "Interview generation returned an invalid response."
                    );
                }

                // -----------------------------------------
                // Stage 3
                // -----------------------------------------

                setActiveStep(2);
                setProgress(75);

                await new Promise((resolve) =>
                    setTimeout(resolve, 400)
                );

                // -----------------------------------------
                // Stage 4
                // -----------------------------------------

                setActiveStep(3);
                setProgress(100);

                console.log(
                    "Generated interview:",
                    result.interview
                );

                /*
                 * Later, when Interview.jsx is ready,
                 * we will navigate here:
                 *
                 * navigate("/interview", {
                 *     state: {
                 *         interview: result.interview
                 *     }
                 * });
                 */

            } catch (error) {
                console.error(
                    "Interview generation failed:",
                    error
                );

                setError(
                    "We couldn't generate your interview. Please try again."
                );
            }
        };

        generate();

    }, [jobDescription, navigate]);

    // ---------------------------------------------
    // Back
    // ---------------------------------------------

    const handleBack = () => {
        navigate("/job-description", {
            state: {
                jobDescription,
            },
        });
    };

    // ---------------------------------------------
    // Retry
    // ---------------------------------------------

    const handleRetry = () => {
        window.location.reload();
    };

    // ---------------------------------------------
    // Generation steps
    // ---------------------------------------------

    const steps = [
        "Analyzing JD",
        "Generating Questions",
        "Preparing Interview",
        "Almost Ready",
    ];

    return (
        <div className="generating-page min-h-screen">

            <Navbar />

            <main className="relative flex min-h-[calc(100vh-64px)] flex-col items-center px-6 py-10">

                {/* -------------------------------- */}
                {/* Back button */}
                {/* -------------------------------- */}

                <div className="w-full max-w-6xl">

                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
                    >
                        <ArrowLeft size={17} />

                        Back
                    </button>

                </div>

                {/* -------------------------------- */}
                {/* Main content */}
                {/* -------------------------------- */}

                <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center text-center">

                    {error ? (

                        /* =================================
                           ERROR STATE
                           ================================= */

                        <div className="flex flex-col items-center">

                            {/* Error icon */}

                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">

                                <span className="text-4xl">
                                    !
                                </span>

                            </div>

                            {/* Heading */}

                            <h1 className="text-2xl font-bold text-gray-950">
                                Something went wrong
                            </h1>

                            {/* Error message */}

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                                {error}
                            </p>

                            {/* Buttons */}

                            <div className="mt-7 flex gap-3">

                                {/* Back */}

                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-violet-300 hover:text-violet-600"
                                >

                                    <ArrowLeft
                                        size={16}
                                    />

                                    Back

                                </button>

                                {/* Try Again */}

                                <button
                                    onClick={handleRetry}
                                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                                >

                                    <RotateCcw
                                        size={16}
                                    />

                                    Try Again

                                </button>

                            </div>

                        </div>

                    ) : (

                        /* =================================
                           GENERATING STATE
                           ================================= */

                        <>

                            {/* -------------------------------- */}
                            {/* Robot */}
                            {/* -------------------------------- */}

                            <div className="robot-wrapper mb-7">

                                <img
                                    src={robotImage}
                                    alt="MockAI preparing your interview"
                                    className="robot-image"
                                />

                            </div>

                            {/* -------------------------------- */}
                            {/* Heading */}
                            {/* -------------------------------- */}

                            <h1 className="text-3xl font-bold tracking-tight text-gray-950">

                                Generating Your Interview...

                            </h1>

                            {/* -------------------------------- */}
                            {/* Description */}
                            {/* -------------------------------- */}

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">

                                We're analyzing the job description and
                                preparing the best questions for you.

                            </p>

                            {/* -------------------------------- */}
                            {/* Progress */}
                            {/* -------------------------------- */}

                            <div className="mt-8 w-full max-w-md">

                                <div className="progress-track">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>

                                <p className="mt-2 text-sm font-semibold text-violet-600">

                                    {progress}%

                                </p>

                            </div>

                            {/* -------------------------------- */}
                            {/* Generation steps */}
                            {/* -------------------------------- */}

                            <div className="generation-steps mt-8 w-full max-w-xl">

                                {steps.map(
                                    (step, index) => {

                                        const completed =
                                            index <
                                            activeStep;

                                        const active =
                                            index ===
                                            activeStep;

                                        return (
                                            <div
                                                key={step}
                                                className="generation-step"
                                            >

                                                {/* Circle */}

                                                <div
                                                    className={`
                                                        step-circle
                                                        ${
                                                            completed
                                                                ? "completed"
                                                                : ""
                                                        }
                                                        ${
                                                            active
                                                                ? "active"
                                                                : ""
                                                        }
                                                    `}
                                                >

                                                    {completed ? (

                                                        <Check
                                                            size={14}
                                                        />

                                                    ) : active ? (

                                                        <LoaderCircle
                                                            size={15}
                                                            className="animate-spin"
                                                        />

                                                    ) : (

                                                        <span />

                                                    )}

                                                </div>

                                                {/* Label */}

                                                <span
                                                    className={`
                                                        step-label
                                                        ${
                                                            active
                                                                ? "step-active"
                                                                : ""
                                                        }
                                                        ${
                                                            completed
                                                                ? "step-completed"
                                                                : ""
                                                        }
                                                    `}
                                                >

                                                    {step}

                                                </span>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        </>
                    )}

                </div>

            </main>

            {/* -------------------------------- */}
            {/* Trust footer */}
            {/* -------------------------------- */}

            <div className="border-t border-violet-100 bg-violet-50/60">

                <div className="flex items-center justify-center gap-3 px-6 py-6 text-center text-xs font-medium text-gray-500">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">

                        <Check size={14} />

                    </div>

                    <span>

                        Your job description is used only to create
                        your personalized interview

                    </span>

                </div>

            </div>

        </div>
    );
}

export default Generating;