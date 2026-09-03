import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">

                {/* Brand */}
                <div>
                    <Link
                        to="/"
                        className="text-lg font-bold text-purple-600"
                    >
                        MockAI
                    </Link>

                    <p className="mt-1 text-xs text-gray-400">
                        Practice smarter. Interview better.
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-5 text-xs text-gray-400">
                    <Link
                        to="/"
                        className="transition hover:text-purple-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/history"
                        className="transition hover:text-purple-600"
                    >
                        Interview History
                    </Link>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} MockAI
                </p>
            </div>
        </footer>
    );
};

export default Footer;