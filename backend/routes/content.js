import express from "express";
import Content from "../models/Content.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: get all content
router.get("/", async (req, res) => {
  const items = await Content.find().sort({ createdAt: -1 });
  res.json(items);
});

// Public: filter by type
router.get("/:type", async (req, res) => {
  const items = await Content.find({ type: req.params.type }).sort({
    createdAt: -1
  });
  res.json(items);
});

// Admin: create content
router.post("/", authRequired, async (req, res) => {
  try {
    const item = await Content.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Admin: delete content
router.delete("/:id", authRequired, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

export default router;

