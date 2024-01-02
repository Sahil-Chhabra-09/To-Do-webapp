const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask).patch(updateTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
