import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import ContactForm from "./pages/ContactForm";
import CropPrediction from "./pages/CropPrediction";
import Fertilizer from "./pages/Fertilizer";
import DiseasePredict from "./pages/DiseasePredict";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/contacts" element={<ContactForm />} />

        <Route path="/cropprediction" element={
          <ProtectedRoute>
            <CropPrediction />
          </ProtectedRoute>
        } />

        <Route path="/fertilizer" element={
          <ProtectedRoute>
            <Fertilizer />
          </ProtectedRoute>
        } />

        <Route path="/cropdisease" element={
          <ProtectedRoute>
            <DiseasePredict />
          </ProtectedRoute>
        } />
      </Routes>

      {/* Logout button shown only when logged in */}
      {isLoggedIn && (
        <div style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
          <button className="btn btn-danger"
          style={{width: "fit-content", padding: "6px 20px"}}
          onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;