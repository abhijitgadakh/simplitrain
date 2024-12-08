// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={handleProfile}>Go to Profile</button>
    </div>
  );
};

export default Home;
