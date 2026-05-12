import express from "express";
import { listMenu, createMenu, updateMenu, deleteMenu } from "../controller/menu.js";

const router = express.Router();

router.get("/", listMenu);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;


