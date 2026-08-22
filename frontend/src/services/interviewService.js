import axios from "axios";

export const generateInterview = async (jobDescription) => {
    console.log("1. Sending request to Node");

    const response = await axios.post(
        "http://localhost:5000/api/interview/generate",
        {
            jobDescription,
        }
    );

    console.log("2. Response received:", response.data);

    return response.data;
};