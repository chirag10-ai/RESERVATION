import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
}, { timestamps: true });

export const Staff = mongoose.model("Staff", staffSchema);


