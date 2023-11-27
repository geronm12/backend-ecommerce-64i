const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deteleStudent,
} = require("../controllers/stundents.controller");
const Authenticate = require("../middleware/authenticate.middleware");

router.get("/students", Authenticate, getStudents);
router.get("/students/:id", Authenticate, getStudentsById);
router.post("/students", Authenticate, createStudent);
router.put("/students/:id", Authenticate, updateStudent);
router.delete("/students/:id", Authenticate, deteleStudent);

module.exports = router;
