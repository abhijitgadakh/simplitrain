// /api/auth.js
const { registerUser, loginUser } = require("../controllers/authController");

module.exports = (req, res) => {
  if (req.method === "POST" && req.url === "/register") {
    return registerUser(req, res);
  } else if (req.method === "POST" && req.url === "/login") {
    return loginUser(req, res);
  }
};
