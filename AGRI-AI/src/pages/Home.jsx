import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div 
            style={{
                backgroundImage: "url('/homepage.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",  
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >
            <style>
                {`
                    body, html {
                        margin: 0;
                        padding: 0;
                        overflow-x: hidden;
                    }
                `}
            </style>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-between align-items-center"> 
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img 
                            src="/agriai.webp"
                            alt="Logo" 
                            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} 
                        />
                        AGRI-AI
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="d-flex gap-3">
                            <Link to="/login" className="btn btn-primary px-4 py-2">Login</Link>
                            <Link to="/signup" className="btn btn-secondary px-4 py-2">Signup</Link>
                            {/* <Link to="/about" className="btn btn-success px-4 py-2">Admin Login</Link> */}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu Section */}
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-light mx-3 px-4 py-2">Home</Link>
                <Link to="/about" className="btn btn-outline-light mx-3 px-4 py-2">About Us</Link>
                <Link to="/contacts" className="btn btn-outline-light mx-3 px-4 py-2">Contact</Link> {/* ✅ Fixed */}
            </div>

            {/* Hero Section */}
            <div className="d-flex flex-column align-items-center justify-content-center text-white text-center" 
                style={{ height: "70vh", width: "100%" }}>
                <h1 className="fw-bold" style={{ fontSize: "2.5rem" }}>AgriAI - Smart Farming Assistant</h1>
                <p className="fs-5">Get detailed information about your Farming Strategy</p>
                <Link to="/services" className="btn btn-success px-5 py-2 fs-5">View Details</Link>
            </div>

            {/* Footer */}
            <footer className="text-center text-white bg-dark" 
                style={{ fontSize: "14px", padding: "5px 0", position: "fixed", bottom: "0", width: "100%" }}>
                © Copyright :  AgriAI - Smart Farming Assistant | GO GREEN...
            </footer>
        </div>
    );
};

export default Home;
