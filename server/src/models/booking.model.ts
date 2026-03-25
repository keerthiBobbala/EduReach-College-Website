import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  courseName: string;
  name: string;
  phone: string;
  branch: string;
  status: string;
  bookedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: {
    type: String,
    required: [true, "Course name is required"],
  },
  name: {
    type: String,
    required: [true, "Student name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
  },
  status: {
    type: String,
    enum: ["Confirmed", "Pending", "Cancelled"],
    default: "Confirmed",
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
