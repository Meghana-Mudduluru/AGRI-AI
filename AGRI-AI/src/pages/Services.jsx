import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Services.css";

const services = [
  {
    name: "Crop",
    description:
      "Recommendation about the type of crops to be cultivated which is best suited for the respective conditions.",
    image: "/crop.jpeg",
    path: "/cropprediction",
  },
  {
    name: "Fertilizer",
    description:
      "Recommendation about the type of fertilizer best suited for the particular soil and the recommended crop.",
    image: "/fertilizer.jpeg",
    path: "/fertilizer",
  },
  // {
  //   name: "Crop Disease",
  //   description:
  //     "Predicting the name and causes of crop disease and suggestions to cure it.",
  //   image: "/cropdisease.jpg",
  //   path: "/cropdisease",
  // },
];

const Services = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="services-wrapper">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <img src={service.image} alt={service.name} />
              <div className="card-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Link to={service.path} className="btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Services;