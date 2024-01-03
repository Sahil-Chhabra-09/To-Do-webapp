const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3001;
const tasks = require("./routes/tasks");
const MONGO_URI = process.env.MONGO_URI;
const notFound = require("./middleware/notfound");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ ping: "pong" });
});
"/",
  (req, res) => {
    res.status(200).json({ ping: "pong" });
  };

app.use("/api/v1/tasks", tasks);
app.use("/api/v1", authRouter);

app.use("*", notFound);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, (req, res) => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
