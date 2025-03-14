import React from "react";
import "./About.css"; // Import CSS file

const About = () => {
  return (
    <div>
      {/* Background Image */}
      <div className="background"></div>
      <div className="overlay"></div>

      {/* Hero Section */}
      <div className="hero">
        <h1>About AgriAI - Smart Farming Assistant</h1>
      </div>

      {/* About Us Section */}
      <div className="about-container">
        <h2><b>About Us</b></h2>
        <p>Welcome to <b>AgriAI</b> – Your Smart Farming Assistant! 🌱🚜</p>
        <p>At <b>AgriAI</b>, we use <b>AI and Machine Learning</b> to help farmers make <b>data-driven decisions</b> about crop selection, fertilizer use, and pest control.</p>
        <p>Our system analyzes <b>soil conditions, weather data, and past crop yields</b> to provide personalized farming recommendations.</p>
      </div>

      {/* Why Choose Us */}
      <div className="about-container">
        <h2>Why Choose Us?</h2>
        <p>✅ <b>Smart Crop Selection</b> – AI-based crop recommendations.</p>
        <p>✅ <b>Optimized Fertilizer Use</b> – Saves money by recommending only necessary nutrients.</p>
        <p>✅ <b>Pest Control Suggestions</b> – AI-driven alerts to protect your crops.</p>
        <p>✅ <b>Data-Driven Decisions</b> – No guesswork, only <b>scientific recommendations!</b></p>
      </div>

      {/* Team Section */}
      <div className="team">
        <h2><u>Meet Our Team</u></h2>
        <div className="team-member">
          {["Meghana", "Yamuna", "Divya"].map((name, index) => (
            <div key={index} className="member">
              <img src="/agriai.webp" alt={name} />
              <h4>{name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
