import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

export const getUserProfile = async (userId) => {
    // Find the authenticated user.
    // We deliberately do not return the password.
    const user = await User.findById(userId).select(
        "name email createdAt"
    );

    if (!user) {
        throw new Error("User not found");
    }

    // Get only completed interviews belonging
    // to this authenticated user.
    const interviews = await Interview.find({
        userId,
        isCompleted: true,
    }).select("totalScore questions");

    const completedInterviews = interviews.length;

    let averageScore = 0;

    if (completedInterviews > 0) {
        let totalPercentage = 0;

        for (const interview of interviews) {
            const totalQuestions =
                interview.questions?.length || 0;

            const maximumScore = totalQuestions * 2;

            if (maximumScore === 0) {
                continue;
            }

            const percentage =
                (interview.totalScore / maximumScore) * 100;

            totalPercentage += percentage;
        }

        averageScore =
            totalPercentage / completedInterviews;
    }

    return {
        success: true,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt || null,
        },

        stats: {
            completedInterviews,
            averageScore: Number(
                (averageScore / 10).toFixed(1)
            ),
        },
    };
};