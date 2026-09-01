import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
} from "lucide-react";
import axios from "axios";

import "./Login.css";
import login1 from "../assets/images/login1.png";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log("Login response:", response.data);

            if (response.data.success) {

    login(response.data.token);

    navigate("/");
}

        } catch (error) {

            console.error("Login Error:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* LEFT SIDE */}
            <section className="login-left">

                <div className="login-brand">

                    <div className="brand-icon">
                        AI
                    </div>

                    <span>
                        Mock<span>AI</span>
                    </span>

                </div>


                <div className="login-left-content">

                    <h1>
                        Welcome back!
                        <br />
                        <span>Login to your account</span>
                    </h1>

                    <p>
                        Continue your journey of
                        <br />
                        smarter interview preparation.
                    </p>

                    <img
                        src={login1}
                        alt="MockAI login illustration"
                        className="login-illustration"
                    />

                </div>

            </section>


            {/* RIGHT SIDE */}
            <section className="login-right">

                <div className="login-form-container">

                    <div className="login-heading">

                        <h2>
                            Login to <span>MockAI</span>
                        </h2>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

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
                                    placeholder="Enter your password"
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
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={21} />
                                    ) : (
                                        <Eye size={21} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* ERROR */}
                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}


                        {/* LOGIN */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>


                        {/* REGISTER */}
                        <p className="signup-link">

                            Don't have an account?{" "}

                            <Link to="/register">
                                Sign up
                            </Link>

                        </p>

                    </form>

                </div>

            </section>


            {/* COPYRIGHT */}
            <div className="login-copyright">
                © 2024 MockAI. All rights reserved.
            </div>

        </div>
    );
};

export default Login;