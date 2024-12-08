// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  const [authState, setAuthState] = useState(false);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setAuthState={setAuthState} />}
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route
        path="/profile"
        element={<PrivateRoute element={<ProfilePage />} />}
      />
      <Route
        path="/profile/:id"
        element={<PrivateRoute element={<ProfilePage />} />}
      />
      <Route
        path="/dashboard"
        element={<AdminRoute element={<Dashboard />} />}
      />
    </Routes>
  );
};

export default App;
