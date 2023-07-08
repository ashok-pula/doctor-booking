import React from "react";
import Navbar from "./components/Navbar/Navbar";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";
import { Provider } from "react-redux";
import store from "./redux/store";
import BookingDetails from "./components/BookingDetails/BookingDetails";

const App = () => {
  return (
    <Provider store={store}>
      <div className="mainContainer">
        <div className="container">
          <Navbar />
          <AppointmentForm />
        </div>
        <hr />
        <BookingDetails />
      </div>
    </Provider>
  );
};

export default App;
