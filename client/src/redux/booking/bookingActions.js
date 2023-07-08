import {
  FETCH_BOOKINGS,
  POST_BOOKING,
  FAILURE_BOOKING,
  DELETE_BOOKING,
  UPDATE_BOOKING,
} from "./bookingConstants";
import axios from "axios";

const fetchBookingsAction = (bookings) => {
  return {
    type: FETCH_BOOKINGS,
    payload: bookings,
  };
};
const postBookingAction = (booking) => {
  return {
    type: POST_BOOKING,
    payload: booking,
  };
};
const failureBookingAction = (message) => {
  return {
    type: FAILURE_BOOKING,
    payload: message,
  };
};
const deleteBookingAction = (data) => {
  return {
    type: DELETE_BOOKING,
    payload: data,
  };
};
const updateBookingAction = (data) => {
  return {
    type: UPDATE_BOOKING,
    payload: data,
  };
};

//async handlers  redux thunk
export const fetchBookings = () => (dispatch) => {
  return axios
    .get("http://localhost:5000/api/booking")
    .then((response) => dispatch(fetchBookingsAction(response.data)))
    .catch((error) => dispatch(failureBookingAction(error.response.data)));
};

export const postBooking = (data) => (dispatch) => {
  return axios
    .post("http://localhost:5000/api/booking", data)
    .then((response) => dispatch(postBookingAction(response.data)))
    .catch((error) => {
      dispatch(failureBookingAction(error.response.data));
    });
};

export const deleteBooking = (id) => (dispatch) => {
  return axios
    .delete("http://localhost:5000/api/booking/" + id)
    .then((response) =>
      dispatch(deleteBookingAction({ data: response.data, id }))
    )
    .catch((error) => dispatch(failureBookingAction(error.response.data)));
};

export const updateBooking = (data, id) => (dispatch) => {
  return axios
    .put("http://localhost:5000/api/booking/" + id, data)
    .then((response) => dispatch(updateBookingAction(response.data)))
    .catch((error) => dispatch(failureBookingAction(error.response.data)));
};
