import axios from "axios";

export const generateInterview = async (data) => {

    const { jobDescription } = data;

    const response = await axios.post(
        "http://localhost:8000/generate",
        {
            jobDescription,
        }
    );

    return response.data;
};