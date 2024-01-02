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

//middleware
app.use(express.json()); //to get the data that will be sent, if we don't use it we won't have the data in req.body
app.use(cors()); //to enable Cross-Origin Resource Sharing
app.get("/", (req, res) => {
  res.status(200).json({ ping: "pong" });
});
"/",
  (req, res) => {
    res.status(200).json({ ping: "pong" });
  };

app.use("/api/v1/tasks", tasks);
app.use("/api/v1", authRouter);

// -get all the task
// -create a new task
// -get single task
// -update task
// -delete task

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
