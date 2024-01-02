const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
