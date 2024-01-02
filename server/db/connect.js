const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose //returns a promise
    .connect(url)
    .then(() => console.log("CONNECTED TO DB..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
