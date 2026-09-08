import api from "../services/api";
export const generateInterview = async (jobDescription) => {
    console.log("1. Sending request to Node");

    const response = await api.post(
        "/api/interview/evaluate",
        {
            jobDescription,
        }
    );

    console.log("2. Response received:", response.data);

    return response.data;
};