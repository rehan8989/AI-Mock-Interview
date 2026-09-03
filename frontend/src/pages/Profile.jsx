import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    User,
    Mail,
    CalendarDays,
    ClipboardCheck,
    TrendingUp,
    LogOut,
    AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const formatDate = (date) => {
    if (!date) {
        return "Not available";
    }

    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const getInitial = (name) => {
    if (!name) {
        return "U";
    }

    return name.charAt(0).toUpperCase();
};

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/api/auth/profile"
                );

                if (response.data.success) {
                    setProfile(response.data);
                } else {
                    setError(
                        response.data.message ||
                            "Unable to load profile."
                    );
                }
            } catch (error) {
                console.error(
                    "Profile Fetch Error:",
                    error
                );

                if (error.response?.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }

                setError(
                    error.response?.data?.message ||
                        "Unable to load your profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleStartInterview = () => {
        navigate("/job-description");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#faf9ff]">

            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-6xl">

                    {/* Back Navigation */}
                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={handleBack}
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
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Profile
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            View your account information and interview
                            preparation progress.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="space-y-4">

                            <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-gray-100" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-40 rounded bg-gray-100" />
                                        <div className="h-3 w-52 rounded bg-gray-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="h-24 animate-pulse rounded-xl bg-white" />
                                <div className="h-24 animate-pulse rounded-xl bg-white" />
                            </div>

                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-100 bg-white px-6 py-12 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <AlertCircle size={22} />
                            </div>

                            <h2 className="mt-4 text-base font-semibold text-gray-900">
                                Unable to load profile
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
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

                    {/* Profile */}
                    {!loading && !error && profile && (
                        <div className="space-y-4">

                            {/* Profile Header */}
                            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                    {/* Avatar */}
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-600 text-2xl font-medium text-white">
                                        {getInitial(
                                            profile.user.name
                                        )}
                                    </div>

                                    {/* User */}
                                    <div className="min-w-0">

                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {profile.user.name}
                                        </h2>

                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <Mail size={14} />

                                            <span className="break-all">
                                                {profile.user.email}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* Statistics */}
                            <section className="grid gap-4 sm:grid-cols-2">

                                {/* Completed */}
                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                            <ClipboardCheck size={21} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400">
                                                Completed Interviews
                                            </p>

                                            <p className="mt-1 text-xl font-semibold text-gray-900">
                                                {
                                                    profile.stats
                                                        .completedInterviews
                                                }
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Average */}
                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                            <TrendingUp size={21} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400">
                                                Average Score
                                            </p>

                                            <p className="mt-1 text-xl font-semibold text-green-600">
                                                {
                                                    profile.stats
                                                        .averageScore
                                                }{" "}
                                                / 10
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* Account Information */}
                            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">

                                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Account Information
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-100">

                                    {/* Name */}
                                    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                            <User size={17} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-400">
                                                Full Name
                                            </p>

                                            <p className="mt-1 break-words text-sm font-medium text-gray-800">
                                                {profile.user.name}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                            <Mail size={17} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-400">
                                                Email Address
                                            </p>

                                            <p className="mt-1 break-all text-sm font-medium text-gray-800">
                                                {profile.user.email}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Joined */}
                                    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                            <CalendarDays size={17} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400">
                                                Joined On
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-800">
                                                {formatDate(
                                                    profile.user
                                                        .createdAt
                                                )}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* Start Interview */}
                            <section className="rounded-xl border border-purple-100 bg-purple-50/50 p-5 sm:p-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-900">
                                            Keep practicing
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Take another mock interview to
                                            improve your preparation.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handleStartInterview
                                        }
                                        className="
                                            w-full
                                            rounded-lg
                                            bg-purple-600
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-medium
                                            text-white
                                            transition
                                            hover:bg-purple-700
                                            sm:w-auto
                                        "
                                    >
                                        Start New Interview
                                    </button>

                                </div>

                            </section>

                            {/* Logout */}
                            <section className="rounded-xl border border-red-100 bg-red-50/50 p-5 sm:p-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                                            <LogOut size={18} />
                                        </div>

                                        <div>
                                            <h2 className="text-sm font-semibold text-red-600">
                                                Logout
                                            </h2>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Sign out from your account.
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-red-300
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition
                                            hover:bg-red-100
                                            sm:w-auto
                                        "
                                    >
                                        Logout
                                    </button>

                                </div>

                            </section>

                        </div>
                    )}

                </div>
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Profile;