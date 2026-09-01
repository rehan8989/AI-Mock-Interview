import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import Interview from "./pages/Interview";
import Generating from "./pages/Generating";
import Results from "./pages/Results";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./components/common/ProtectedRoute";

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
                    PROTECTED ROUTES
                ================================= */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

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

            </Routes>
        </BrowserRouter>
    );
}

export default App;