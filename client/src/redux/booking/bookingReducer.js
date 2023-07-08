import {
  DELETE_BOOKING,
  FAILURE_BOOKING,
  FETCH_BOOKINGS,
  POST_BOOKING,
  UPDATE_BOOKING,
} from "./bookingConstants";

const initialState = {
  bookings: [],
  error: "",
  message: "",
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return { ...state, bookings: action.payload, error: "", message: "" };
    case POST_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        error: "",
        message: "",
      };
    case UPDATE_BOOKING:
      const bookings = state.bookings.map((booking) => {
        if (booking._id === action.payload._id) {
          return (booking = action.payload);
        }
        return booking;
      });
      return { ...state, bookings: [...bookings], error: "", message: "" };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(
          (book) => book._id !== action.payload.id
        ),
        error: "",
        message: action.payload.data,
      };
    case FAILURE_BOOKING:
      return { ...state, error: action.payload, message: "" };
    default:
      return state;
  }
};
export default bookingReducer;
