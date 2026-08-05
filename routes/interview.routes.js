import express from "express";
import { generateInterview } from "../services/interview.service.js";
const router = express.Router();

router.post("/api/interview/generate", async (req, res) => {
  try {
    const result = await generateInterview(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

export default router;
