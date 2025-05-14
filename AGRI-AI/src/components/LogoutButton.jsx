import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear login token
    navigate("/login"); // Redirect to login page
  };

  return (
    <button className="btn btn-danger ms-2" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
