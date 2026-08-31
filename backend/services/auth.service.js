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

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // we'll decide what to return here next
    return {
    userId: user._id,
    name: user.name,
    email: user.email,
};
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
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    return {
        userId: user._id,
        token,
    };
};

export { registerUser, loginUser, };