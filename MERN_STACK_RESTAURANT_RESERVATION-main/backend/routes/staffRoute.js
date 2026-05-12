import express from "express";
import { listStaff, createStaff, updateStaff, deleteStaff } from "../controller/staff.js";

const router = express.Router();

router.get("/", listStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;


