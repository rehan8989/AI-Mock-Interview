import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Code2,
  Database,
  BarChart3,
  MessageCircle,
  FileCode2,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const getScoreStyle = (score, totalScore) => {
  if (!totalScore) {
    return "text-gray-600";
  }

  const percentage = (score / totalScore) * 100;

  if (percentage >= 80) {
    return "text-green-600";
  }

  if (percentage >= 60) {
    return "text-orange-500";
  }

  return "text-red-500";
};

const getIcon = (skills = []) => {
  const skillText = skills.join(" ").toLowerCase();

  if (
    skillText.includes("react") ||
    skillText.includes("javascript") ||
    skillText.includes("frontend")
  ) {
    return Code2;
  }

  if (
    skillText.includes("node") ||
    skillText.includes("express") ||
    skillText.includes("backend")
  ) {
    return Database;
  }

  if (
    skillText.includes("python") ||
    skillText.includes("java") ||
    skillText.includes("c++")
  ) {
    return FileCode2;
  }

  if (
    skillText.includes("communication") ||
    skillText.includes("leadership") ||
    skillText.includes("sales")
  ) {
    return MessageCircle;
  }

  return BarChart3;
};

const getIconStyle = (index) => {
  const styles = [
    "bg-purple-50 text-purple-600",
    "bg-blue-50 text-blue-500",
    "bg-orange-50 text-orange-500",
    "bg-pink-50 text-pink-500",
    "bg-green-50 text-green-500",
  ];

  return styles[index % styles.length];
};

const formatDate = (date) => {
  if (!date) {
    return "Date unavailable";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const History = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/interview/history");

        if (response.data.success) {
          setInterviews(response.data.interviews || []);
        } else {
          setError(
            response.data.message || "Unable to load interview history.",
          );
        }
      } catch (error) {
        console.error("History Fetch Error:", error);

        if (error.response?.status === 401) {
          setError("Your session has expired. Please login again.");
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to load your interview history.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /*
   * Go exactly one step back in browser history.
   * This works from both desktop and mobile.
   */
  const handleBack = () => {
    navigate(-1);
  };

  const handleStartInterview = () => {
    navigate("/job-description");
  };

  const handleViewResults = (interview) => {
    /*
     * Results.jsx expects:
     *
     * location.state.results
     * location.state.interview
     *
     * The history API already gives us everything
     * required to construct both objects.
     */

    const results = {
      totalScore: interview.totalScore || 0,
      questions: interview.questions || [],
    };

    navigate("/results", {
      state: {
        results,
        interview,
        elapsedSeconds: 0,
        fromHistory: true,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9ff]">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          {/* Back Navigation */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-500
            transition
            hover:text-purple-600
        "
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          {/* Header */}
          <div className="mb-7 flex flex-col gap-5 sm:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Interview History
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Review your previous interviews and track your interview
                preparation progress.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartInterview}
              className="
                                w-full
                                rounded-lg
                                bg-purple-600
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                shadow-sm
                                transition
                                hover:bg-purple-700
                                sm:w-auto
                            "
            >
              + Start New Interview
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                                        animate-pulse
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        p-5
                                    "
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-lg bg-gray-100" />

                    <div className="flex-1">
                      <div className="h-4 w-48 rounded bg-gray-100" />

                      <div className="mt-2 h-3 w-28 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="mt-5 h-20 rounded-lg bg-gray-50" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="
                                rounded-xl
                                border
                                border-red-100
                                bg-white
                                px-6
                                py-12
                                text-center
                            "
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertCircle size={22} />
              </div>

              <h2 className="mt-4 text-base font-semibold text-gray-900">
                Unable to load history
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="
                                    mt-5
                                    rounded-lg
                                    bg-purple-600
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-purple-700
                                "
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && interviews.length === 0 && (
            <div
              className="
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-6
                                    py-16
                                    text-center
                                    shadow-sm
                                "
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <ClipboardList size={25} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-gray-900">
                No interviews yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Complete your first mock interview and your results will appear
                here.
              </p>

              <button
                type="button"
                onClick={handleStartInterview}
                className="
                                        mt-6
                                        rounded-lg
                                        bg-purple-600
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-purple-700
                                    "
              >
                Start Your First Interview
              </button>
            </div>
          )}

          {/* Interviews */}
          {!loading && !error && interviews.length > 0 && (
            <div className="space-y-4">
              {interviews.map((interview, index) => {
                const Icon = getIcon(interview.extractedSkills);

                const totalQuestions = interview.questions?.length || 0;

                const totalPossibleScore = totalQuestions * 2;

                return (
                  <div
                    key={interview._id}
                    className="
                                                    rounded-xl
                                                    border
                                                    border-gray-200
                                                    bg-white
                                                    p-4
                                                    shadow-sm
                                                    transition
                                                    hover:shadow-md
                                                    sm:p-5
                                                "
                  >
                    {/* Desktop */}
                    <div className="hidden md:flex md:items-center">
                      {/* Icon */}
                      <div
                        className={`
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            ${getIconStyle(
                                                              index,
                                                            )}
                                                        `}
                      >
                        <Icon size={21} strokeWidth={2} />
                      </div>

                      {/* Job */}
                      <div className="ml-4 w-[235px] shrink-0">
                        <h2
                          className="
                                                                line-clamp-2
                                                                text-sm
                                                                font-semibold
                                                                leading-5
                                                                text-gray-900
                                                            "
                        >
                          {interview.jobDescription}
                        </h2>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                          <CalendarDays size={13} />

                          <span>{formatDate(interview.createdAt)}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-12 w-px shrink-0 bg-gray-200" />

                      {/* Score */}
                      <div className="ml-7 w-28 shrink-0">
                        <p className="text-xs font-medium text-gray-400">
                          Score
                        </p>

                        <p
                          className={`
                                                                mt-1
                                                                text-base
                                                                font-semibold
                                                                ${getScoreStyle(
                                                                  interview.totalScore,
                                                                  totalPossibleScore,
                                                                )}
                                                            `}
                        >
                          {interview.totalScore} / {totalPossibleScore}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-12 w-px shrink-0 bg-gray-200" />

                      {/* Questions */}
                      <div className="ml-7 w-32 shrink-0">
                        <p className="text-xs font-medium text-gray-400">
                          Questions
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-800">
                          {totalQuestions} Questions
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-12 w-px shrink-0 bg-gray-200" />

                      {/* Status */}
                      <div className="ml-7 w-28 shrink-0">
                        <p className="text-xs font-medium text-gray-400">
                          Status
                        </p>

                        <span
                          className="
                                                                mt-1
                                                                inline-flex
                                                                rounded-full
                                                                bg-green-50
                                                                px-2.5
                                                                py-1
                                                                text-[11px]
                                                                font-medium
                                                                text-green-600
                                                            "
                        >
                          Completed
                        </span>
                      </div>

                      {/* Results */}
                      <button
                        type="button"
                        onClick={() => handleViewResults(interview)}
                        className="
                                                            ml-auto
                                                            flex
                                                            shrink-0
                                                            items-center
                                                            gap-2
                                                            rounded-lg
                                                            border
                                                            border-purple-300
                                                            px-4
                                                            py-2
                                                            text-xs
                                                            font-medium
                                                            text-purple-600
                                                            transition
                                                            hover:bg-purple-50
                                                        "
                      >
                        View Results
                        <ChevronRight size={15} />
                      </button>
                    </div>

                    {/* Desktop Skills */}
                    <div className="ml-[60px] mt-3 hidden items-center gap-2 md:flex">
                      <span className="mr-1 shrink-0 text-xs font-medium text-gray-500">
                        Skills Tested:
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {(interview.extractedSkills || []).map((skill) => (
                          <span
                            key={skill}
                            className="
                                                                        rounded-full
                                                                        bg-[#f3f1fb]
                                                                        px-2.5
                                                                        py-1
                                                                        text-[10px]
                                                                        font-medium
                                                                        text-gray-600
                                                                    "
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                      {/* Top */}
                      <div className="flex items-start">
                        <div
                          className={`
                                                                flex
                                                                h-11
                                                                w-11
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                ${getIconStyle(
                                                                  index,
                                                                )}
                                                            `}
                        >
                          <Icon size={21} strokeWidth={2} />
                        </div>

                        <div className="ml-3 min-w-0 flex-1">
                          <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 sm:text-base">
                            {interview.jobDescription}
                          </h2>

                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                            <CalendarDays size={13} />

                            <span>{formatDate(interview.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {/* Score */}
                        <div className="rounded-lg bg-gray-50 p-3">
                          <p className="text-[11px] font-medium text-gray-400">
                            Score
                          </p>

                          <p
                            className={`
                                                                    mt-1
                                                                    text-sm
                                                                    font-semibold
                                                                    ${getScoreStyle(
                                                                      interview.totalScore,
                                                                      totalPossibleScore,
                                                                    )}
                                                                `}
                          >
                            {interview.totalScore} / {totalPossibleScore}
                          </p>
                        </div>

                        {/* Questions */}
                        <div className="rounded-lg bg-gray-50 p-3">
                          <p className="text-[11px] font-medium text-gray-400">
                            Questions
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {totalQuestions}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-2 rounded-lg bg-gray-50 p-3 sm:col-span-1">
                          <p className="text-[11px] font-medium text-gray-400">
                            Status
                          </p>

                          <span
                            className="
                                                                    mt-1
                                                                    inline-flex
                                                                    rounded-full
                                                                    bg-green-50
                                                                    px-2
                                                                    py-1
                                                                    text-[10px]
                                                                    font-medium
                                                                    text-green-600
                                                                "
                          >
                            Completed
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      {interview.extractedSkills?.length > 0 && (
                        <div className="mt-5">
                          <p className="mb-2 text-xs font-medium text-gray-500">
                            Skills Tested
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {interview.extractedSkills.map((skill) => (
                              <span
                                key={skill}
                                className="
                                                                                rounded-full
                                                                                bg-[#f3f1fb]
                                                                                px-2.5
                                                                                py-1
                                                                                text-[10px]
                                                                                font-medium
                                                                                text-gray-600
                                                                            "
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Results */}
                      <button
                        type="button"
                        onClick={() => handleViewResults(interview)}
                        className="
                                                            mt-5
                                                            flex
                                                            w-full
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            rounded-lg
                                                            border
                                                            border-purple-300
                                                            px-4
                                                            py-2.5
                                                            text-xs
                                                            font-medium
                                                            text-purple-600
                                                            transition
                                                            hover:bg-purple-50
                                                        "
                      >
                        View Results
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default History;
