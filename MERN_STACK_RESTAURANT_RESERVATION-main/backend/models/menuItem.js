import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
}, { timestamps: true });

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);


