const express = require("express");
const { signUp, login } = require("../controllers/auth");
const authRouter = express.Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/login").post(login);

module.exports = authRouter;
