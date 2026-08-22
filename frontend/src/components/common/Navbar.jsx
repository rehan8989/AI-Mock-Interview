import {
    History,
    UserCircle,
} from "lucide-react";

function Navbar() {
    return (
        <header className="border-b border-violet-100 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-md shadow-violet-200">
                        M
                    </div>

                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Mock<span className="text-violet-600">AI</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden items-center gap-10 md:flex">
                    <a
                        href="#"
                        className="font-medium text-violet-600"
                    >
                        Home
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-2 font-medium text-gray-500 transition hover:text-violet-600"
                    >
                        <History size={17} />
                        History
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-2 font-medium text-gray-500 transition hover:text-violet-600"
                    >
                        <UserCircle size={17} />
                        Profile
                    </a>
                </nav>

                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-semibold text-white shadow-sm">
                    R
                </div>
            </div>
        </header>
    );
}

export default Navbar;