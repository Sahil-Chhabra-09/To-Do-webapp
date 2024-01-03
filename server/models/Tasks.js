const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "you must provide a name for the task"],
    trim: true,
    maxlength: [50, "task name cannot be more than 50 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  uid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
