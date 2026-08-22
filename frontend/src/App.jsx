import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import Generating from "./pages/Generating";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/job-description" element={<JobDescription />} />

                <Route
                    path="/generating"
                    element={<Generating />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
