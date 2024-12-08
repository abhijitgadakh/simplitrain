import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate hook
import { loginUser } from "../api"; // Correct import for the loginUser function

const LoginPage = ({ setAuthState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.user.usertype);
      setAuthState(true, data.user.usertype);

      // Navigate to the profile page with the email as a query parameter
      navigate(`/profile?email=${email}`);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password - 'test@123'"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
