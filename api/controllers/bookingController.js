const createError = require("../config/createError");
const Booking = require("../models/BookingModel");

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
const postBooking = async (req, res, next) => {
  try {
    const existBooking = await Booking.findOne({
      patient: req.body.patient,
      doctor: req.body.doctor,
      date: req.body.date,
      time: req.body.time,
    });

    if (existBooking)
      return next(
        createError(
          400,
          "patient already booked the appoint with doctor on same date and time"
        )
      );

    if (req.body.consult == "revisit") {
      const revisitBooking = await Booking.findOne({
        patient: req.body.patient,
        doctor: req.body.doctor,
        consult: "consult",
      });
      if (!revisitBooking)
        return next(createError(400, "please book the consult before revisit"));
      else {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        return res.status(201).json(newBooking);
      }
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
const updateBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateBooking);
  } catch (error) {
    next(error);
  }
};
const deleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Booking.findByIdAndDelete(id);
    res.status(201).json("deleted the booking successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllBookings, postBooking, updateBooking, deleteBooking };
