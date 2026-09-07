import { useEffect, useRef, useState } from "react";

import {
    History,
    UserCircle,
    LogOut,
    ChevronDown,
    Home,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";


function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const {
        logout,
        isNavigationLocked,
    } = useAuth();

    const [isProfileOpen, setIsProfileOpen] =
        useState(false);

    const [profile, setProfile] =
        useState(null);

    const dropdownRef =
        useRef(null);


    // ---------------------------------------------
    // Detect whether user is inside an assessment
    // ---------------------------------------------

    const isAssessmentActive =
        location.pathname === "/interview";


    // ---------------------------------------------
    // Fetch logged-in user's profile
    // ---------------------------------------------

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get(
                    "/api/auth/profile"
                );

                if (response.data.success) {

                    const userData =
                        response.data.user ||
                        response.data;

                    setProfile(userData);
                }

            } catch (error) {

                console.error(
                    "Navbar Profile Fetch Error:",
                    error
                );


                // If token is invalid/expired
                if (
                    error.response?.status === 401
                ) {

                    logout();

                    navigate("/login");
                }
            }
        };


        fetchProfile();

    }, [logout, navigate]);


    // ---------------------------------------------
    // Dynamic user name
    // ---------------------------------------------

    const userName =
        profile?.name || "User";


    // ---------------------------------------------
    // Dynamic avatar initial
    // ---------------------------------------------

    const userInitial =
        userName
            .trim()
            .charAt(0)
            .toUpperCase() || "U";


    // ---------------------------------------------
    // Close dropdown when clicking outside
    // ---------------------------------------------

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target
                )
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
    // Navigation lock message
    // ---------------------------------------------

    const showNavigationLockedMessage = () => {

        window.alert(
            "Please wait until the current process is complete."
        );
    };


    // ---------------------------------------------
    // Home
    // ---------------------------------------------

    const handleHome = () => {

        if (isNavigationLocked) {

            showNavigationLockedMessage();

            return;
        }


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

        if (isNavigationLocked) {

            showNavigationLockedMessage();

            return;
        }


        setIsProfileOpen(false);

        navigate("/history");
    };


    // ---------------------------------------------
    // Profile
    // ---------------------------------------------

    const handleProfile = () => {

        if (isNavigationLocked) {

            showNavigationLockedMessage();

            return;
        }


        setIsProfileOpen(false);

        navigate("/profile");
    };


    // ---------------------------------------------
    // Logout
    // ---------------------------------------------

    const handleLogout = () => {

        if (isNavigationLocked) {

            showNavigationLockedMessage();

            return;
        }


        setIsProfileOpen(false);

        logout();

        navigate("/");
    };


    return (

        <header className="relative z-50 border-b border-violet-100 bg-white/90 backdrop-blur">

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
                        onClick={() => {

                            if (isNavigationLocked) {

                                showNavigationLockedMessage();

                                return;
                            }

                            setIsProfileOpen(
                                (previous) =>
                                    !previous
                            );
                        }}
                        className="flex items-center gap-2"
                        aria-label="Open profile menu"
                        aria-expanded={
                            isProfileOpen
                        }
                    >


                        {/* Dynamic Avatar */}

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-semibold text-white shadow-sm">

                            {userInitial}

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


                    {/* =================================
                        DROPDOWN
                    ================================= */}

                    {isProfileOpen && (

                        <div className="absolute right-0 top-14 z-[100] w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">


                            {/* User info */}

                            <div className="border-b border-gray-100 px-4 py-3">

                                <p className="text-sm font-semibold text-gray-900">

                                    {userName}

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

                                Assessment History

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