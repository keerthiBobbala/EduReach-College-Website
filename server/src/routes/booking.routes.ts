import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = Router();

// Endpoint requires authentication
router.post("/", authMiddleware, createBooking);

export default router;
