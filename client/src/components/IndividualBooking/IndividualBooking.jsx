import React, { useState } from "react";
import "./individualBooking.css";
import { useDispatch } from "react-redux";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Navbar from "../Navbar/Navbar";
import { deleteBooking } from "../../redux/booking/bookingActions";
const IndividualBooking = ({ booking }) => {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    const confirmation = confirm("are you sure? delete booking " + booking._id);
    if (confirmation) {
      dispatch(deleteBooking(id));
    }
  };
  return (
    <>
      {flag && (
        <div className="container">
          <Navbar />
          <AppointmentForm booking={booking} update setFlag={setFlag} />
        </div>
      )}
      <div className="individualBooking">
        <div className="patientDetails">
          <img className="patientImg" src="./images/avatar.png" alt="" />
          <div className="nameDetails">
            <span className="patientName">{booking?.patient}</span>
            <div className="ageDetails">
              <span className="patientAge">{booking?.age} yrs,</span>
              <span className="patientGender">{booking?.gender}</span>
            </div>
          </div>
        </div>
        <div>
          {booking?.consult === "consult" ? (
            <span className="consult">Consult</span>
          ) : (
            <span className="revisit">Revisit</span>
          )}
        </div>
        <div className="timeDetails">
          <span className="time">{booking?.time}</span>
          <span className="date">{booking?.date}</span>
        </div>
        <div className="phoneDetails">
          <span className="phone">{booking?.phone}</span>
          <span className="contact">contact</span>
        </div>
        <div className="doctorName">Dr. {booking?.doctor}</div>
        <div className="buttons">
          <button className="edit" onClick={() => setFlag(true)}>
            Edit
          </button>
          <button className="delete" onClick={() => deleteHandler(booking._id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default IndividualBooking;
