import React, { useState } from 'react';
import './CropPrediction.css'; // Ensure this file exists

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    state: "",
    city: ""
  });

  const [result, setResult] = useState(""); // Stores the prediction result

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending request with:", formData);

    try {
        const response = await fetch(`${BACKEND_URL}/predict/crop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Prediction received:", data);

        setResult(data.prediction); // ✅ Set prediction result
    } catch (error) {
        console.error("Error fetching prediction:", error.message);
        setResult("Input values are not within acceptable agricultural range.");
    }
  };

  return (
    <div className="crop-body">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>NITROGEN</label>
          <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />

          <label>PHOSPHOROUS</label>
          <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required />

          <label>POTASSIUM</label>
          <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} required />

          <label>TEMPERATURE</label>
          <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required />

          <label>HUMIDITY</label>
          <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required />

          <label>PH</label>
          <input type="number" name="ph" value={formData.ph} onChange={handleChange} required />

          <label>RAINFALL</label>
          <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
{/* 
          <label>STATE</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
          </select>

          <label>CITY</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            <option value="Kadapa">Kadapa</option>
            <option value="Nellore">Nellore</option>
            <option value="Anantapur">Anantapur</option>
            <option value="Kurnool">Kurnool</option>
            <option value="Tirupathi">Tirupathi</option>
            <option value="Madurai">Madurai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Mysuru">Mysuru</option>
            <option value="Kochi">Kochi</option>
            <option value="Hyderabad">Hyderabad</option>
          </select> */}

          <button className="predict-btn" type="submit">Predict</button>
        </form>

        {/* ✅ Display Prediction in Red */}
        {result && <p className="prediction-result">Recommended Crop: {result}</p>}
      </div>
    </div>
  );
};

export default CropPrediction;
