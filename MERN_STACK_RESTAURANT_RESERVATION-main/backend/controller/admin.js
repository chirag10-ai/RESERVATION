import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";
import { User } from "../models/user.js";

// Get all reservations (Admin)
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch reservations", 500));
  }
};

// Get single reservation (Admin)
export const getSingleReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch reservation", 500));
  }
};

// Update reservation status (Admin)
export const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation status updated successfully",
      reservation,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update reservation", 500));
  }
};

// Delete reservation (Admin)
export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }

    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to delete reservation", 500));
  }
};

// Get reservation statistics (Admin)
export const getReservationStats = async (req, res, next) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayReservations = await Reservation.countDocuments({
      date: {
        $gte: today.toISOString().split('T')[0]
      }
    });

    const pendingReservations = await Reservation.countDocuments({
      status: 'pending'
    });

    const confirmedReservations = await Reservation.countDocuments({
      status: 'confirmed'
    });

    res.status(200).json({
      success: true,
      stats: {
        total: totalReservations,
        today: todayReservations,
        pending: pendingReservations,
        confirmed: confirmedReservations,
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch statistics", 500));
  }
};

// Get all users (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("name email role createdAt");
    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch users", 500));
  }
};

// Get user statistics (Admin)
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: 'admin' });
    const regular = await User.countDocuments({ role: 'user' });
    res.status(200).json({ success: true, stats: { total: totalUsers, admins, users: regular } });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch user statistics", 500));
  }
};
