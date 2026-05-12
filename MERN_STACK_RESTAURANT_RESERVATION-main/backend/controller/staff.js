import ErrorHandler from "../middlewares/error.js";
import { Staff } from "../models/staff.js";

export const listStaff = async (req, res, next) => {
  try {
    const members = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, members });
  } catch (e) {
    return next(new ErrorHandler("Failed to fetch staff", 500));
  }
};

export const createStaff = async (req, res, next) => {
  try {
    const { name, designation, image } = req.body;
    if (!name || !designation || !image) return next(new ErrorHandler("All fields are required", 400));
    const member = await Staff.create({ name, designation, image });
    res.status(201).json({ success: true, member });
  } catch (e) {
    return next(new ErrorHandler("Failed to create staff", 500));
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    const member = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return next(new ErrorHandler("Staff not found", 404));
    res.status(200).json({ success: true, member });
  } catch (e) {
    return next(new ErrorHandler("Failed to update staff", 500));
  }
};

export const deleteStaff = async (req, res, next) => {
  try {
    const member = await Staff.findByIdAndDelete(req.params.id);
    if (!member) return next(new ErrorHandler("Staff not found", 404));
    res.status(200).json({ success: true, message: "Staff deleted" });
  } catch (e) {
    return next(new ErrorHandler("Failed to delete staff", 500));
  }
};


