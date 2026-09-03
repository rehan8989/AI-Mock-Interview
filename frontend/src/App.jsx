import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import GuestHome from "./pages/GuestHome";
import JobDescription from "./pages/JobDescription";
import Interview from "./pages/Interview";
import Generating from "./pages/Generating";
import Results from "./pages/Results";
import Register from "./pages/Register";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/common/ProtectedRoute";

const HomeRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Home /> : <GuestHome />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =================================
                            PUBLIC ROUTES
                    ================================= */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =================================
                            HOME ROUTE
                    ================================= */}

                <Route
                    path="/"
                    element={<HomeRoute />}
                />


                {/* =================================
                            PROTECTED ROUTES
                    ================================= */}

                <Route
                    path="/job-description"
                    element={
                        <ProtectedRoute>
                            <JobDescription />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/generating"
                    element={
                        <ProtectedRoute>
                            <Generating />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <Interview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/results"
                    element={
                        <ProtectedRoute>
                            <Results />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;