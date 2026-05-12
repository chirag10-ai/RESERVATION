import express from "express";
import {
  getAllReservations,
  getSingleReservation,
  updateReservationStatus,
  deleteReservation,
  getReservationStats,
  getAllUsers,
  getUserStats
} from "../controller/admin.js";

const router = express.Router();

// Admin routes (completely public - no authentication required)
router.get("/reservations", getAllReservations);
router.get("/reservations/stats", getReservationStats);
router.get("/reservations/:id", getSingleReservation);
router.post("/reservations/:id/status", updateReservationStatus);
router.post("/reservations/:id", deleteReservation);

// Users routes (completely public - no authentication required)
router.get("/users", getAllUsers);
router.get("/users/stats", getUserStats);

// Test route to check if authentication is bypassed
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin test route works without authentication"
  });
});

export default router;
