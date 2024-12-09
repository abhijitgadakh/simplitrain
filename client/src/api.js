// src/api.js

const API_BASE_URL = process.env.SERVER_PATH + "/api";

// Function to handle login
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data;
};

// Other functions can be exported here, for example:
export const registerUser = async (
  firstname,
  lastname,
  username,
  email,
  password,
  usertype
) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      email,
      password,
      usertype,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  const data = await response.json();
  return data;
};
