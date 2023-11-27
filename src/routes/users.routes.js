const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  login,
  updateUser,
  getProfile,
} = require("../controllers/user.controller");
const ValidateUser = require("../middleware/validate.user.middleware");
const Authenticate = require("../middleware/authenticate.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({}),
}).fields([{ name: "file", maxCount: 1 }]);

router.get("/users", getUsers);
router.post("/users", ValidateUser, createUser);
router.get("/users/login", login);
router.put("/users", [Authenticate, upload], updateUser);
router.get("/profile", [Authenticate], getProfile);

module.exports = router;
