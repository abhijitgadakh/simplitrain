const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, firstname, lastname, email, password, usertype } = req.body;

  console.log("username: " + username);
  console.log("firstname: " + firstname);
  console.log("lastname: " + lastname);
  console.log("email: " + email);
  console.log("password: " + password);
  console.log("usertype: " + usertype);
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
    usertype,
  });

  await user.save();
  const token = generateToken(user._id);
  res.status(201).json({ user, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  res.json({ user, token });
};

module.exports = { registerUser, loginUser };
