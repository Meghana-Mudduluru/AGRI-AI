import React, { useState } from "react";
import axios from "axios";
import "./DiseasePredict.css";

const DiseasePredict = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPrediction(""); // reset previous result
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/predict-disease", formData);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error("Error uploading image:", error);
      setPrediction("Something went wrong. Try again!");
    }
  };

  return (
    <div className="disease-container">
      <div className="header">
        <h1>Find out which disease has been caught by your plant</h1>
      </div>

      <div className="upload-box">
        <h3>Please upload the image</h3>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          <button type="submit">Upload</button>
        </form>

        {file && <p>Selected File: {file.name}</p>}
        {prediction && <h3 className="result">Prediction: {prediction}</h3>}
      </div>
    </div>
  );
};

export default DiseasePredict;
