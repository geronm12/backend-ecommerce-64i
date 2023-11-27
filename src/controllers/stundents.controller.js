//CONTROLLER CREADO PARA TRABAJAR EN MEMORIA Y TESTEAR DB


const StudentScheme = require("../models/student");

async function getStudents(req, res) {
  let students = [];
  if (req.query.nombre) {
    students = await StudentScheme.find({ nombre: req.query.nombre }).exec();
  } else {
    students = await StudentScheme.find();
  }

  let htmlString = "";

  students.forEach((estudiante) => {
    htmlString += `<div>
          <label style='font-size:16px;color:blue; font-weight:bold;'>${estudiante.nombre[0].toUpperCase()}${estudiante.nombre.substring(
      1,
      estudiante.nombre.length
    )} ${estudiante.apellido}</label>
        </div>`;
  });

  res.send(htmlString);
}

async function getStudentsById(req, res) {
  const estudiante = await StudentScheme.findById(req.params.id);

  if (!estudiante) {
    res
      .status(400)
      .send(`<h4 style='color: red;'>No se encontró al estudiante</h4>`);
  }

  res.send(`<div>
    <label style='font-size:32px;color:blue; font-weight:bold;'>
    <span style='font-size:16px; color: black;'>${estudiante._id}</span>
    ${estudiante.nombre[0].toUpperCase()}${estudiante.nombre.substring(
    1,
    estudiante.nombre.length
  )} ${estudiante.apellido}</label>
  </div>`);
}

async function createStudent(req, res) {
  const { nombre, apellido } = req.body;

  const newStudent = await StudentScheme.create({
    nombre,
    apellido,
  });
  if (newStudent) {
    res
      .status(200)
      .send(`<h1 style='color: green;'>${JSON.stringify(newStudent)}</h1>`);
  }
}

async function updateStudent(req, res) {
  const { nombre, apellido } = req.body;
  const { id } = req.params;

  const updatedStudent = await StudentScheme.findByIdAndUpdate(id, {
    nombre,
    apellido,
  });

  if (updatedStudent) {
    return res.status(200).send("<h1 style='color: green;'>Ok</h1>");
  }

  return res.status(400).send("error");
}

async function deteleStudent(req, res) {
  const { id } = req.params;

  const studentDeleted = await StudentScheme.findByIdAndDelete(id);

  if (studentDeleted) {
    return res.status(200).json({
      ok: true,
      data: studentDeleted,
    });
  }

  return res.status(400).send("<h1 style='color: red;'>No Ok</h1>");
}

module.exports = {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deteleStudent,
};
