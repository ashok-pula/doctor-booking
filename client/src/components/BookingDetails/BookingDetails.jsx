import React, { useEffect, useState } from "react";
import "./bookingDetails.css";
import { useDispatch, useSelector } from "react-redux";
import IndividualBooking from "../IndividualBooking/IndividualBooking";
import { fetchBookings } from "../../redux/booking/bookingActions";
const BookingDetails = () => {
  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  return (
    <div>
      {booking.bookings.length <= 0 && <span>No Bookings Available</span>}

      {booking.bookings.length > 0 && (
        <>
          <div className="bookingDetailsheadings">
            <span>Patient</span>
            <span className="status">Status</span>
            <span>Appointment</span>
            <span>Phone</span>
            <span>Doctor</span>
            <span>Actions</span>
          </div>
          {booking?.bookings.map((booking) => (
            <IndividualBooking booking={booking} key={booking?._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default BookingDetails;
