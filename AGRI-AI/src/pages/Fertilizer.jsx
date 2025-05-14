import React, { useState } from "react";
import axios from "axios";
import "./Fertilizer.css";

const Fertilizer = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    crop: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(""); // Clear previous result
    try {
      const response = await axios.post("http://localhost:5000/recommend", formData);
      setResult(response.data.message);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setResult("❌ Not valid inputs");
    }
  };

  return (
    <div className="fertilizer-container">
      <div className="fertilizer-form">
        <h2>Fertilizer Recommendation</h2>
        <form onSubmit={handleSubmit}>
          <label>Nitrogen (N)</label>
          <input type="number" name="nitrogen" placeholder="Enter value" onChange={handleChange} required />

          <label>Phosphorus (P)</label>
          <input type="number" name="phosphorus" placeholder="Enter value" onChange={handleChange} required />

          <label>Potassium (K)</label>
          <input type="number" name="potassium" placeholder="Enter value" onChange={handleChange} required />

          <label>Crop</label>
          <select name="crop" onChange={handleChange} required>
            <option value="">Select Crop</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="orange">Orange</option>
            <option value="grapes">Grapes</option>
          </select>

          <button type="submit">Get Recommendation</button>
        </form>
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default Fertilizer;
