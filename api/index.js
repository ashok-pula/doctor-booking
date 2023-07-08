const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRouter = require("./routes/bookingRouter");
const app = express();

//configuration
app.use(express.json());
dotenv.config();
app.use(cors());

//routes
app.use("/api/booking", bookingRouter);

//error
app.use((err, req, res, next) => {
  const errorStatus = err.status;
  const errorMessage = err.message;
  return res.status(errorStatus).send(errorMessage);
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("server is running at " + PORT);
});
