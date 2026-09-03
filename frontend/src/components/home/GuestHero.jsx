import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import heroImage from "../../assets/images/mockai-hero.png";

const GuestHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#faf9ff]">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-200/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600">
            <Rocket size={16} />
            AI-Powered Mock Interviews
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-6xl">
            Ace Your Next
            <br />
            Interview with
            <br />
            <span className="text-violet-600">MockAI</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            MockAI generates personalized interview questions based on your job
            description and provides AI feedback to help you improve and land
            your dream job.
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="
                            mt-8
                            inline-flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-violet-600
                            px-7
                            py-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-violet-200
                            transition
                            hover:bg-violet-700
                            hover:shadow-xl
                        "
          >
            <Rocket size={18} />
            Start Your Free Interview
            <ArrowRight size={18} />
          </button>

          {/* Small supporting text */}
          <p className="mt-4 text-xs text-gray-400">
            Create an account to start practicing.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-violet-200/40 blur-3xl" />

            {/* Existing Hero illustration */}
            <img
              src={heroImage}
              alt="AI-powered mock interview"
              className="
        relative
        mx-auto
        w-full
        max-w-xl
        object-contain
    "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestHero;
