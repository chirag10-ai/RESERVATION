import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";

const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);
  res.status(200).json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return next(new ErrorHandler("All fields are required", 400));

    const existing = await User.findOne({ email });
    if (existing) return next(new ErrorHandler("Email already in use", 409));

    const user = await User.create({ name, email, password });
    return sendToken(user, res);
  } catch (error) {
    return next(new ErrorHandler("Registration failed", 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Email and password are required", 400));

    const user = await User.findOne({ email }).select("+password name email role");
    if (!user) return next(new ErrorHandler("Invalid credentials", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

    return sendToken(user, res);
  } catch (error) {
    return next(new ErrorHandler("Login failed", 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    });
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    return next(new ErrorHandler("Logout failed", 500));
  }
};

export const me = async (req, res, next) => {
  try {
    if (!req.user) return next(new ErrorHandler("Unauthorized", 401));
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return next(new ErrorHandler("Failed to load profile", 500));
  }
};


