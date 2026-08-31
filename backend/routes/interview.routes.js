import express from "express";
import {
    generateInterview,
    evaluateInterview,
    getInterviewHistory

} from "../services/interview.service.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/api/interview/generate",
    authMiddleware, async (req, res) => {
        try {
            console.log("Request body:", req.body);
            console.log("Authenticated user:", req.user);

            const result = await generateInterview({
                ...req.body,
                userId: req.user.userId,
            });

            return res.status(200).json(result);

        } catch (error) {
            console.error("Generate Error:", error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
);

router.post("/api/interview/evaluate", authMiddleware, async (req, res) => {
    console.log("Evaluate route hit");

    try {
        const result = await evaluateInterview({
    ...req.body,
    userId: req.user.userId,
});

        return res.status(200).json(result);

    } catch (error) {
        console.error("Evaluation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get("/api/interview/history", authMiddleware, async (req, res) => {
    try {
        const result = await getInterviewHistory(req.user.userId);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("History Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})
export default router;