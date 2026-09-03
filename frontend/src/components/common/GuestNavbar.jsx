import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

const GuestNavbar = () => {
    const navigate = useNavigate();

    return (
        <header className="border-b border-violet-100 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

                {/* Logo */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                        <BrainCircuit size={22} />
                    </div>

                    <span className="text-xl font-bold tracking-tight text-gray-950">
                        Mock<span className="text-violet-600">AI</span>
                    </span>
                </button>


                {/* Authentication Actions */}
                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="
                            rounded-lg
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-600
                            transition
                            hover:bg-violet-50
                            hover:text-violet-600
                        "
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="
                            rounded-lg
                            bg-violet-600
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            shadow-sm
                            transition
                            hover:bg-violet-700
                        "
                    >
                        Get Started
                    </button>

                </div>

            </div>
        </header>
    );
};

export default GuestNavbar;