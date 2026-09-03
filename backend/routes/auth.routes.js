import express from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {getUserProfile} from "../services/user.service.js"

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const user = await registerUser({
            name,
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            user,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            user: user.Id,
            token: user.token,
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });

    }
});

router.get("/test", authMiddleware, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
});

router.get(
    "/profile",
    authMiddleware,
    async (req, res) => {
        try {
            const result = await getUserProfile(
                req.user.userId
            );

            return res.status(200).json(result);
        } catch (error) {
            console.error("Profile Error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Internal Server Error",
            });
        }
    }
);
export default router;