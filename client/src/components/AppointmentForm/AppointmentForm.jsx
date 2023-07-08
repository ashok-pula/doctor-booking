import React, { useEffect, useState } from "react";
import "./appointmentForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  postBooking,
  updateBooking,
} from "../../redux/booking/bookingActions";

const AppointmentForm = ({ booking, update, setFlag }) => {
  const [patient, setPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [consult, setConsult] = useState("");
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");

  const bookings = useSelector((state) => state.booking);
  console.log("Ashok Pula");
  const dispatch = useDispatch();

  const today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  const year = today.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  const minDate = year + "-" + month + "-" + day;

  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  const changeNameHandler = (e) => {
    const re = /^[A-Za-z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPatient(e.target.value);
    }
  };
  const changePhoneHandler = (e) => {
    const re = /^[0-9]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const changeDoctorHandler = (e) => {
    const re = /^[A-Za-z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setDoctor(e.target.value);
    }
  };
  const changeAgeHandler = (e) => {
    const re = /^[0-9]+$/;
    if (
      (e.target.value === "" || re.test(e.target.value)) &&
      e.target.value <= 100
    ) {
      setAge(e.target.value);
    }
  };
  const formSubmitHanlder = async (e) => {
    e.preventDefault();
    const data = {
      patient,
      phone,
      doctor,
      gender,
      date,
      consult,
      age,
      time,
    };

    update
      ? dispatch(updateBooking(data, booking._id))
      : dispatch(postBooking(data));

    update && setFlag(false);
    // setPatient("");
    // setPhone("");
    // setDoctor("");
    // setGender("");
    // setDate("");
    // setConsult("");
    // setAge("");
    // setTime("");
  };
  return (
    <div className="appointmentContainer">
      <form onSubmit={formSubmitHanlder} className="form">
        <div className="inputContainers">
          <div className="inputContainer">
            <input
              type="text"
              value={patient}
              placeholder={update ? booking?.patient : "Patient Name*"}
              onChange={changeNameHandler}
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder={update ? booking?.phone : "Phone Number*"}
              value={phone}
              onChange={changePhoneHandler}
              maxLength="10"
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder={update ? booking?.doctor : "Doctor Name*"}
              required
              value={doctor}
              onChange={changeDoctorHandler}
            />
          </div>
          <div className="inputContainer">
            <select
              name="gender"
              id=""
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled defaultValue>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="inputContainer">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={minDate}
            />
          </div>
          <div className="inputContainer">
            <select
              id=""
              value={consult}
              onChange={(e) => setConsult(e.target.value)}
              required
            >
              <option value="" defaultValue disabled>
                type of visit
              </option>
              <option value="consult">Consult</option>
              <option value="revisit">Revisit</option>
            </select>
          </div>
          <div className="inputContainer">
            <input
              type="text"
              maxLength="3"
              placeholder={update ? booking.age : "Age*"}
              value={age}
              onChange={changeAgeHandler}
              required
            />
          </div>
          <div className="inputContainer">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="actionButtons">
          <button className="appointmentButton" type="submit">
            {update ? "Update" : "Book"} Appointment
          </button>
          {update && (
            <button onClick={() => setFlag(false)} className="cancelButton">
              Cancel Update
            </button>
          )}
        </div>
        {bookings.error && (
          <span className="bookingError">{bookings.error}</span>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;
