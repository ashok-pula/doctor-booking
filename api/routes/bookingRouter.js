const express = require("express");
const {
  getAllBookings,
  postBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const bookingRouter = express.Router();

//get all bookings
bookingRouter.get("/", getAllBookings);

//post booking
bookingRouter.post("/", postBooking);

//update booking
bookingRouter.put("/:id", updateBooking);

//delete booking
bookingRouter.delete("/:id", deleteBooking);

module.exports = bookingRouter;
