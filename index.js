const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const connect = require("./src/db/database");
const studentsRoutes = require("./src/routes/students.routes");
const usersRoutes = require("./src/routes/users.routes");

const API_PREFIX = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(API_PREFIX, studentsRoutes);
app.use(API_PREFIX, usersRoutes);

connect();

app.listen(port, () => {
  console.log("Ejecutando servidor de desarrollo");
});
