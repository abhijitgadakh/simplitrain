const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const updateUserProfile = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.email = email || user.email;

  await user.save();
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
};
