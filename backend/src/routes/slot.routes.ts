import { Router } from "express";
import {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  deleteSlot,
  updateSlot,
} from "../controllers/slot.contrller";
import { verifyAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/all", getAllSlots);
router.get("/", getAvailableSlots);
router.post("/", verifyAdmin, createSlot);
router.put("/:id", verifyAdmin, updateSlot);
router.delete("/:id", verifyAdmin, deleteSlot);

export default router;
