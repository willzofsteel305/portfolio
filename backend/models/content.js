import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["music", "video", "art"], required: true },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    thumbnail: { type: String },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);

