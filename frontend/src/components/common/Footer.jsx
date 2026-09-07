import {
    UserRound,
    CalendarDays,
    Code2,
} from "lucide-react";

import { Link } from "react-router-dom";
import footerQuote from "../../assets/images/footer1.png";

const Footer = () => {
    return (
        <footer className="relative mt-auto overflow-hidden border-t border-violet-100 bg-[#faf9ff]">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />


            {/* Decorative Bottom Waves */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">

                <div className="absolute -bottom-16 -left-10 h-32 w-[45%] rounded-[50%] bg-violet-200/40" />

                <div className="absolute -bottom-20 left-[20%] h-32 w-[40%] rounded-[50%] bg-purple-100/70" />

                <div className="absolute -bottom-16 right-[-5%] h-32 w-[45%] rounded-[50%] bg-violet-200/35" />

                <div className="absolute bottom-4 left-[-5%] h-px w-[40%] rotate-[8deg] bg-violet-400/60" />

                <div className="absolute bottom-2 right-[-3%] h-px w-[38%] -rotate-[10deg] bg-violet-400/60" />

            </div>


            {/* Footer Content */}
            <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-10 lg:px-10">

                <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.8fr_1fr]">


                    {/* =========================================
                        BRAND
                    ========================================= */}
                    <div className="text-center lg:text-left">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2"
                        >

                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white shadow-sm">
                                M
                            </span>

                            <span className="text-lg font-bold tracking-tight text-gray-950">
                                Mock
                                <span className="text-violet-600">
                                    AI
                                </span>
                            </span>

                        </Link>


                        <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-gray-500 lg:mx-0">
                            Your AI-powered partner for mock
                            Assessments and career success.
                        </p>


                        {/* =====================================
                            SOCIAL ICONS
                        ===================================== */}
                        <div className="mt-5 flex justify-center gap-2.5 lg:justify-start">


                            {/* =================================
                                LINKEDIN
                            ================================= */}
                            <a
                                href="https://www.linkedin.com/in/rehan-waghoo-8a34732a6/"
                                aria-label="LinkedIn"
                                target="_blank"
    rel="noopener noreferrer"
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-violet-100
                                    bg-white
                                    text-gray-500
                                    shadow-sm
                                    transition
                                    hover:border-violet-200
                                    hover:bg-violet-50
                                    hover:text-violet-600
                                "
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-[16px] w-[16px]"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V8.99h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V8.99H3.56v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                                </svg>

                            </a>


                            {/* =================================
                                GITHUB
                            ================================= */}
                            <a
                                href="https://github.com/rehan8989"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-violet-100
                                    bg-white
                                    text-gray-500
                                    shadow-sm
                                    transition
                                    hover:border-violet-200
                                    hover:bg-violet-50
                                    hover:text-violet-600
                                "
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-[17px] w-[17px]"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z"
                                    />

                                </svg>

                            </a>


                            {/* =================================
                                X
                            ================================= */}
                            <a
                                href="#"
                                aria-label="X"
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-violet-100
                                    bg-white
                                    text-gray-500
                                    shadow-sm
                                    transition
                                    hover:border-violet-200
                                    hover:bg-violet-50
                                    hover:text-violet-600
                                "
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-[14px] w-[14px]"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                                </svg>

                            </a>

                        </div>

                    </div>


                    {/* =========================================
                        PROJECT INFORMATION
                    ========================================= */}
                    <div className="border-y border-violet-100 py-6 lg:border-y-0 lg:border-l lg:border-r lg:px-8 lg:py-4">

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">


                            {/* Developer */}
                            <div className="flex items-center justify-center gap-3 sm:justify-start">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                    <UserRound size={16} />
                                </div>

                                <div>

                                    <p className="text-[10px] font-medium text-gray-400">
                                        Developer
                                    </p>

                                    <p className="mt-0.5 text-xs font-semibold text-gray-800">
                                        Rehan Waghoo
                                    </p>

                                </div>

                            </div>


                            {/* Created */}
                            <div className="flex items-center justify-center gap-3 sm:justify-start">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                    <CalendarDays size={16} />
                                </div>

                                <div>

                                    <p className="text-[10px] font-medium text-gray-400">
                                        Created
                                    </p>

                                    <p className="mt-0.5 text-xs font-semibold text-gray-800">
                                        September 2026
                                    </p>

                                </div>

                            </div>


                            {/* Version */}
                            <div className="flex items-center justify-center gap-3 sm:justify-start">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                    <Code2 size={16} />
                                </div>

                                <div>

                                    <p className="text-[10px] font-medium text-gray-400">
                                        Version
                                    </p>

                                    <p className="mt-0.5 text-xs font-semibold text-gray-800">
                                        1.0.0
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        QUOTE
                    ========================================= */}
                    <div className="flex justify-center lg:justify-end">

                        <img
                            src={footerQuote}
                            alt="Better assessments. Brighter future."
                            className="
                                w-full
                                max-w-[210px]
                                object-contain
                                drop-shadow-sm
                            "
                        />

                    </div>

                </div>


                {/* =========================================
                    COPYRIGHT
                ========================================= */}
                <div className="relative z-10 mt-7 text-center">

                    <p className="text-[10px] text-gray-400">
                        © {new Date().getFullYear()} MockAI.
                        All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;