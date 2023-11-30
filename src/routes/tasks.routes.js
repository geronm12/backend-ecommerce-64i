const express = require("express");
const router = express.Router();
const {
  addTask,
  getAllTasks,
  changeTaskState,
  updateTasks,
  deleteTask,
} = require("../controllers/task.controller");

const Authenticate = require("../middleware/authenticate.middleware");

router.get("/tasks", [Authenticate], getAllTasks);
router.post("/tasks", [Authenticate], addTask);
router.put("/tasks/:id", [Authenticate], updateTasks);
router.put("/tasks/state/:id", [Authenticate], changeTaskState);
router.delete("/tasks/:id", [Authenticate], deleteTask);

module.exports = router;
