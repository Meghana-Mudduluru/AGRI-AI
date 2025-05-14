import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // For navigation after signup

    const validateSignup = async (event) => {
        event.preventDefault();

        if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            setErrorMessage("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup Successful! You can now login.");
                navigate("/login"); // Redirect to login page
            } else {
                setErrorMessage(data.message || "Signup failed. Try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage("Server error. Try again later.");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={validateSignup}>
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit">Sign Up</button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
                <p>Already have an account? <Link to="/login">Login Here</Link></p>
            </div>

            <footer className="text-center text-white bg-dark" 
                style={{ fontSize: "14px", padding: "5px 0", position: "fixed", bottom: "0", width: "100%" }}>
                © Copyright :  AgriAI - Smart Farming Assistant | GO GREEN...
            </footer>
        </div>
    );
};

export default Signup;
