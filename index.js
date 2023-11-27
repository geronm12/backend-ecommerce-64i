const express = require("express");
const app = express();
const cors = require("cors");

const connect = require("./src/db/database");
const studentsRoutes = require("./src/routes/students.routes");
const usersRoutes = require("./src/routes/users.routes");
const tasksRoutes = require("./src/routes/tasks.routes");

const dotenv = require("dotenv");
const { configCloudinary } = require("./src/controllers/cloudinary.controller");
const API_PREFIX = "/api";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(API_PREFIX, studentsRoutes);
app.use(API_PREFIX, usersRoutes);
app.use(API_PREFIX, tasksRoutes);

configCloudinary(
  process.env.CLOUDINARY_ENV,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

connect();

app.listen(process.env.PORT, () => {
  console.log("Ejecutando servidor de desarrollo");
});
