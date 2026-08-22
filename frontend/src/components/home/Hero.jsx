import { ArrowRight, Rocket } from "lucide-react";
import heroImage from "../../assets/images/mockai-hero.png";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

            <div className="grid items-center gap-12 lg:grid-cols-2">

                {/* Left side */}
                <div>

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
                        <Rocket size={16} />
                        AI-Powered Mock Interviews
                    </div>

                    <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-gray-950 lg:text-6xl">
                        Ace Your Next Interview with{" "}
                        <span className="text-violet-600">
                            MockAI
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        MockAI generates personalized interview questions
                        based on your job description and provides AI
                        feedback to help you improve and land your dream job.
                    </p>

                    <button
                        onClick={() => navigate("/job-description")}
                        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-violet-600 px-7 py-4 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 hover:shadow-xl"
                    >
                        <Rocket size={19} />
                        Start New Interview
                        <ArrowRight size={18} />
                    </button>

                </div>

                {/* Right side */}
                <div className="flex justify-center lg:justify-end">
                    <img
                        src={heroImage}
                        alt="Person preparing for an interview with MockAI"
                        className="hero-image w-full max-w-xl object-contain"
                    />
                </div>

            </div>
        </section>
    );
}

export default Hero;