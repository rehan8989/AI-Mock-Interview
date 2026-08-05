import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRouter from "./routes/system.routes.js";
import interviewRouter from "./routes/interview.routes.js";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(urlRouter);
app.use(interviewRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});