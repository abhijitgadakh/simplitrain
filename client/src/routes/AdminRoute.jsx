// src/routes/AdminRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ element, ...rest }) => {
  const userType = localStorage.getItem("userType");
  return userType === "admin" ? element : <Navigate to="/" />;
};

export default AdminRoute;
