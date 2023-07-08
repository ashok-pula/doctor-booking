const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
