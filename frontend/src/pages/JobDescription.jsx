import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import "./JobDescription.css";

function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      return;
    }

    console.log("Job Description:", jobDescription);

    navigate("/generating", {
      state: {
        jobDescription,
      },
    });
  };

  return (
    <div className="job-description-page min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Enter Job Description
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Paste the job description below to generate custom interview
            questions.
          </p>
        </div>

        {/* Textarea */}
        <div className="mt-8">
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste job description here..."
            className="h-56 w-full resize-none rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <div className="mt-2 text-right text-xs text-gray-400">
            {jobDescription.length} characters
          </div>
        </div>

        {/* OR */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs font-medium text-gray-400">OR</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Generate */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!jobDescription.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            Generate Interview
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      {/* Trust Section */}
      <section className="border-t border-violet-100 bg-violet-50/60">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-7 text-center text-sm font-medium text-gray-500">
          <ShieldCheck size={18} className="text-violet-600" />

          <span>
            Your job description is used only to create your personalized
            interview
          </span>
        </div>
      </section>
    </div>
  );
}

export default JobDescription;
