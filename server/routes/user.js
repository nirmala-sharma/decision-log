const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users/register
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, username, password, phone } = req.body;
    const userId = await User.registerUser(firstname, lastname, username, password, phone);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.loginUser(username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ message: "Login successful", userId: user.User_Id, username: user.Username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const { firstname, lastname, username } = req.body;
    await User.updateUser(req.params.id, firstname, lastname, username);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;