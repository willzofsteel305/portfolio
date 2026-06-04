import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

const router = express.Router();

// One-time admin creation
router.post("/register-admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await user.findOne({ username });
    if (exists) return res.status(400).json({ message: "User exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    await user.create({ username, passwordHash });

    res.json({ message: "Admin created" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await user.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

