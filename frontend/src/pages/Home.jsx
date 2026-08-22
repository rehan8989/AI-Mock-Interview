import {
    BrainCircuit,
    Clock3,
    FileSearch,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";

import "./Home.css";



function Home() {
    return (
        <div className="home-page">

            <Navbar />

            <main>

                <Hero />

                {/* Features */}
                <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">

                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-950">
                            Everything you need to succeed
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                            MockAI is designed to help you practice,
                            evaluate and improve so you can perform your
                            best in real interviews.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <FeatureCard
                            icon={BrainCircuit}
                            title="AI Generated Questions"
                            description="Get interview questions generated based on the skills and requirements from your job description."
                        />

                        <FeatureCard
                            icon={Clock3}
                            title="Real-time Evaluation"
                            description="Receive instant evaluation and AI-powered feedback for your answers."
                        />

                        <FeatureCard
                            icon={FileSearch}
                            title="Detailed Results"
                            description="Review your answers, correct answers, AI feedback and areas where you can improve."
                        />

                    </div>
                </section>

                {/* Trust section */}
                <section className="border-t border-violet-100 bg-violet-50/60">
                    <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-7 text-center text-sm font-medium text-gray-500">
                        <div className="h-2 w-2 rounded-full bg-violet-500" />
                        Built to help students and professionals prepare with confidence
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Home;