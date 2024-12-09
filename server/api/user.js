// /api/user.js
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

module.exports = (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return getAllUsers(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/:id")) {
    return getUserById(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/:id")) {
    return updateUser(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/:id")) {
    return deleteUser(req, res);
  }
};
