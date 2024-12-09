const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.get("/", protect, getAllUsers); // Only admin can view all users
router.get("/:id", protect, getUserById); // Any user can view their profile or admin can view any user's profile
router.put("/:id", protect, updateUser); // Users can update their own data, admins can update anyone's data
router.delete("/:id", protect, deleteUser); // Only admin can delete users

module.exports = router;
