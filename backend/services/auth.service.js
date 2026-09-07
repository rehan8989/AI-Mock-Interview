import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async ({ name, email, password }) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return {
            userId: user._id,
            name: user.name,
            email: user.email,
        };

    } catch (error) {

        // Handle duplicate email race condition
        if (error.code === 11000) {
            throw new Error("User already exists");
        }

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const firstError =
                Object.values(error.errors)[0];

            throw new Error(
                firstError?.message ||
                "Please enter valid registration details"
            );
        }

        throw error;
    }
};


const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(
            "User does not exist please register"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new Error(
            "Incorrect Password"
        );
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        userId: user._id,
        token,
    };
};


export {
    registerUser,
    loginUser,
};