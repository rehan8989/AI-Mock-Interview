import { useEffect, useRef, useState } from "react";
import {
    History,
    UserCircle,
    LogOut,
    ChevronDown,
    Home,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isProfileOpen, setIsProfileOpen] =
        useState(false);

    const dropdownRef = useRef(null);

    // ---------------------------------------------
    // Detect whether user is inside an assessment
    // ---------------------------------------------

    const isAssessmentActive =
        location.pathname === "/interview";

    // ---------------------------------------------
    // Close dropdown when clicking outside
    // ---------------------------------------------

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // ---------------------------------------------
    // Home
    // ---------------------------------------------

    const handleHome = () => {
    if (isAssessmentActive) {
        window.alert(
            "Please finish the assessment first."
        );

        return;
    }

    navigate("/");
};

    // ---------------------------------------------
    // History
    // ---------------------------------------------

    const handleHistory = () => {
        setIsProfileOpen(false);

        navigate("/history");
    };

    // ---------------------------------------------
    // Profile
    // ---------------------------------------------

    const handleProfile = () => {
        setIsProfileOpen(false);

        navigate("/profile");
    };

    // ---------------------------------------------
    // Logout
    // ---------------------------------------------

    const handleLogout = () => {
        setIsProfileOpen(false);

        // Authentication will be implemented later.
        // For now this is only the UI behavior.

        console.log("Logout clicked");

        // Later:
        // localStorage.removeItem("token");
        // navigate("/login");
    };

    return (
        <header className="border-b border-violet-100 bg-white/90 backdrop-blur">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

                {/* =====================================
                    LOGO
                ===================================== */}

                <button
                    type="button"
                    onClick={handleHome}
                    className="flex items-center gap-3"
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-md shadow-violet-200">

                        M

                    </div>

                    <span className="text-xl font-bold tracking-tight text-gray-900">

                        Mock
                        <span className="text-violet-600">
                            AI
                        </span>

                    </span>

                </button>


                {/* =====================================
                    NAVIGATION
                ===================================== */}

                <nav className="hidden items-center gap-10 md:flex">

                    {/* Home */}

                    <button
                        type="button"
                        onClick={handleHome}
                        className={`flex items-center gap-2 font-medium transition ${
                            location.pathname === "/"
                                ? "text-violet-600"
                                : "text-gray-500 hover:text-violet-600"
                        }`}
                    >

                        <Home size={17} />

                        Home

                    </button>


                    {/* History */}

                    <button
                        type="button"
                        onClick={handleHistory}
                        className={`flex items-center gap-2 font-medium transition ${
                            location.pathname === "/history"
                                ? "text-violet-600"
                                : "text-gray-500 hover:text-violet-600"
                        }`}
                    >

                        <History size={17} />

                        History

                    </button>


                    {/* Profile */}

                    <button
                        type="button"
                        onClick={handleProfile}
                        className={`flex items-center gap-2 font-medium transition ${
                            location.pathname === "/profile"
                                ? "text-violet-600"
                                : "text-gray-500 hover:text-violet-600"
                        }`}
                    >

                        <UserCircle size={17} />

                        Profile

                    </button>

                </nav>


                {/* =====================================
                    PROFILE DROPDOWN
                ===================================== */}

                <div
                    ref={dropdownRef}
                    className="relative"
                >

                    {/* Avatar button */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsProfileOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                        className="flex items-center gap-2"
                        aria-label="Open profile menu"
                        aria-expanded={
                            isProfileOpen
                        }
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-semibold text-white shadow-sm">

                            R

                        </div>

                        <ChevronDown
                            size={16}
                            className={`hidden text-gray-500 transition-transform sm:block ${
                                isProfileOpen
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />

                    </button>


                    {/* Dropdown */}

                    {isProfileOpen && (

                        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">

                            {/* User info */}

                            <div className="border-b border-gray-100 px-4 py-3">

                                <p className="text-sm font-semibold text-gray-900">
                                    Rehan
                                </p>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    My Account
                                </p>

                            </div>


                            {/* Profile */}

                            <button
                                type="button"
                                onClick={
                                    handleProfile
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                            >

                                <UserCircle
                                    size={17}
                                />

                                Profile

                            </button>


                            {/* History */}

                            <button
                                type="button"
                                onClick={
                                    handleHistory
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                            >

                                <History
                                    size={17}
                                />

                                Interview History

                            </button>


                            {/* Divider */}

                            <div className="border-t border-gray-100" />


                            {/* Logout */}

                            <button
                                type="button"
                                onClick={
                                    handleLogout
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                            >

                                <LogOut
                                    size={17}
                                />

                                Logout

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;