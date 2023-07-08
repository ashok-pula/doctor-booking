const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    patient: { type: String, required: true },
    phone: { type: Number, required: true },
    doctor: { type: String, required: true },
    gender: { type: String, required: true },
    date: { type: String, required: true },
    consult: { type: String, required: true },
    age: { type: Number, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
