import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import Interview from "./pages/Interview";
import Generating from "./pages/Generating";
import Results from "./pages/Results";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/job-description"
                    element={<JobDescription />}
                />

                <Route
                    path="/generating"
                    element={<Generating />}
                />

                <Route
                    path="/interview"
                    element={<Interview />}
                />

                <Route
                    path="/results"
                    element={<Results />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;