import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Public: submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "Missing fields" });

    const saved = await Message.create({ name, email, subject, message });

    res.status(201).json({ message: "Message received", id: saved._id });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: view messages
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

export default router;

