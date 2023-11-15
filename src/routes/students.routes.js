const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deteleStudent,
} = require("../controllers/stundents.controller");

router.get("/students", getStudents);
router.get("/students/:id", getStudentsById);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deteleStudent);

module.exports = router;
