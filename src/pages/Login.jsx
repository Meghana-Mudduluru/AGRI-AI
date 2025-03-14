import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Ensure you import the CSS file

const Login = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: "url('/topimage.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
                position: "relative"
            }}
        >
            <div
                className="bg-white p-4 rounded shadow border border-primary"
                style={{
                    width: "400px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderWidth: "3px" // Increase border thickness if needed
                }}
            >
                <h2 className="text-primary">Login</h2>
                <form>
                    <div className="mb-3 text-start">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" id="username" placeholder="Enter Username" className="form-control" required />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" placeholder="Enter Password"  className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>

            {/* Copyright Footer */}
            <footer className="text-center text-white bg-dark" 
    style={{ fontSize: "14px", padding: "5px 0", position: "fixed", bottom: "0", width: "100%" }}>
   © Copyright :  AgriAI - Smart Farming Assistant | GO GREEN...
</footer>

        </div>
    );
};

export default Login;
