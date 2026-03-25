import type { Request, Response, NextFunction } from "express";
import Booking from "../models/booking.model.ts";
import User from "../models/user.model.ts";

// POST /api/bookings
export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { courseName, name, phone, branch } = req.body;
    const currentUser = (req as any).user; // Set by authMiddleware

    if (!courseName || !name || !phone || !branch) {
      res.status(400).json({ success: false, message: "Course name, name, phone, and branch are all required." });
      return;
    }

    const user = await User.findById(currentUser.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    const newBooking = await Booking.create({
      user: user._id,
      courseName,
      name,
      phone,
      branch
    });

    res.status(201).json({
      success: true,
      message: `Successfully booked a seat for ${courseName}!`,
      data: newBooking,
    });
  } catch (error: any) {
    next(error);
  }
};
