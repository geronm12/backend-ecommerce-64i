const express = require("express");
const router = express.Router();
const { addTask, getAllTasks } = require("../controllers/task.controller");

const Authenticate = require("../middleware/authenticate.middleware");

router.get("/tasks", [Authenticate], getAllTasks);
router.post("/tasks", [Authenticate], addTask);

module.exports = router;
