import ErrorHandler from "../middlewares/error.js";
import { MenuItem } from "../models/menuItem.js";

export const listMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (e) {
    return next(new ErrorHandler("Failed to fetch menu", 500));
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const { title, category, image } = req.body;
    if (!title || !category || !image) return next(new ErrorHandler("All fields are required", 400));
    const item = await MenuItem.create({ title, category, image });
    res.status(201).json({ success: true, item });
  } catch (e) {
    return next(new ErrorHandler("Failed to create menu item", 500));
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new ErrorHandler("Menu item not found", 404));
    res.status(200).json({ success: true, item });
  } catch (e) {
    return next(new ErrorHandler("Failed to update menu item", 500));
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return next(new ErrorHandler("Menu item not found", 404));
    res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (e) {
    return next(new ErrorHandler("Failed to delete menu item", 500));
  }
};


