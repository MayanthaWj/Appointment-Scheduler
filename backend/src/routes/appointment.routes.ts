import { Router } from "express";
import {
  bookAppointment,
  getAppointmentsByEmail,
  cancelAppointment,
} from "../controllers/appointment.controller";

const router = Router();

router.post("/", bookAppointment);
router.get("/:email", getAppointmentsByEmail);
router.delete("/:id", cancelAppointment);

export default router;
