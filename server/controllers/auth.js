const User = require("../models/User");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.find({ name: name });
    console.log(user);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    if (user.length === 0) {
      const savedUser = {
        name,
        password: passwordHash,
      };
      const createdUser = await User.create(savedUser);
      const userDetails = {
        name: name,
        uid: createdUser._id,
      };
      res.status(200).send({ success: true, user: userDetails });
    } else {
      res
        .status(400)
        .send({ success: true, msg: "User already exists and is verified" });
    }
  } catch (error) {
    console.log("Couldn't signup", error.message);
    res.status(500).json({ success: false, msg: "Couldn't sign up" });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name: name });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid credentials" });
    }
    const userDetails = {
      name: user.name,
      uid: user._id,
    };
    res.status(200).send({ success: true, user: userDetails });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Couldn't login" });
  }
};

module.exports = { signUp, login };
