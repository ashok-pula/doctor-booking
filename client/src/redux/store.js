import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import bookingReducer from "./booking/bookingReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  booking: bookingReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
