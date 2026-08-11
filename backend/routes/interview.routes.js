import express from "express";
import {
    generateInterview,
    evaluateInterview
} from "../services/interview.service.js";

const router = express.Router();

router.post("/api/interview/generate", async (req, res) => {
    try {
        const result = await generateInterview(req.body);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.post("/api/interview/evaluate", async (req, res) => {
    console.log("Evaluate route hit");

    try {
        const result = await evaluateInterview(req.body);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Evaluation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default router;