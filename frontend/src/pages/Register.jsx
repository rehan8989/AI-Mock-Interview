import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
} from "lucide-react";
import axios from "axios";

import "./Register.css";
import register1 from "../assets/images/register1.png";

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Check password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            console.log("Register response:", response.data);

            // Registration successful
            if (response.data.success) {
                navigate("/login");
            }

        } catch (error) {
            console.error("Registration Error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            {/* LEFT SIDE */}
            <section className="register-left">

                <div className="register-brand">
                    <div className="brand-icon">
                        AI
                    </div>

                    <span>
                        Mock<span>AI</span>
                    </span>
                </div>


                <div className="register-left-content">

                    <h1>
                        Practice Smarter.
                        <br />
                        Get <span>Hired.</span>
                    </h1>

                    <p>
                        Create your account and access
                        <br />
                        AI-powered mock interviews,
                        <br />
                        personalized feedback and more.
                    </p>

                    <img
                        src={register1}
                        alt="MockAI interview illustration"
                        className="register-illustration"
                    />

                </div>


                <div className="register-copyright">
                    © 2024 MockAI. All rights reserved.
                </div>

            </section>


            {/* RIGHT SIDE */}
            <section className="register-right">

                <div className="register-form-container">

                    <div className="register-heading">

                        <h2>
                            Create Your Account
                        </h2>

                        <p>
                            Fill in the details to get started
                        </p>

                    </div>


                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        {/* NAME */}
                        <div className="form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <div className="input-wrapper">

                                <UserRound size={22} />

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* EMAIL */}
                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <Mail size={22} />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}
                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <LockKeyhole size={22} />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={21} />
                                    ) : (
                                        <Eye size={21} />
                                    )}
                                </button>

                            </div>

                            <span className="password-hint">
                                Password must be at least 6 characters
                            </span>

                        </div>


                        {/* CONFIRM PASSWORD */}
                        <div className="form-group">

                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <div className="input-wrapper">

                                <LockKeyhole size={22} />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={21} />
                                    ) : (
                                        <Eye size={21} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* ERROR */}
                        {error && (
                            <p className="register-error">
                                {error}
                            </p>
                        )}


                        {/* CREATE ACCOUNT */}
                        <button
                            type="submit"
                            className="create-account-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>


                        {/* LOGIN */}
                        <p className="login-link">

                            Already have an account?{" "}

                            <Link to="/login">
                                Log in
                            </Link>

                        </p>

                    </form>

                </div>

            </section>

        </div>
    );
};

export default Register;