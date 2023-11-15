const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//url -> localhost -> 127.0.0.1:3000
//GET -> Leer
//POST -> Alta (Crear)
//PUT -> Modificar
//DELETE -> Eliminar
//PATCH -> Modificar algunos campos

//llamar la función get que trae app creo una url con
//verbo get
//objeto request (req) -> petición
//objeto response (res) -> respuesta

//CORS -> Crossed Origins
//nueva versión > 18.1 -> --watch
//nodemon -> fast refresh
//Loging -> escribir o persistir los mensajes del sistema

//mockear datos -> crear datos fake
let estudiantes = [
  {
    id: 1,
    nombre: "geronimo",
    apellido: "lopez",
  },
  {
    id: 2,
    nombre: "nicolas",
    apellido: "sanchez",
  },
  {
    id: 3,
    nombre: "diego",
    apellido: "herrera",
  },
];


app.get("/", (req, res) => {
  console.log(estudiantes);
  let _estudiantes = estudiantes;
  if (req.query.nombre) {
    _estudiantes = _estudiantes.filter(
      (estudiante) => estudiante.nombre === req.query.nombre
    );
  }

  let htmlString = "";

  _estudiantes.forEach((estudiante) => {
    htmlString += `<div>
      <label style='font-size:16px;color:blue; font-weight:bold;'>${estudiante.nombre[0].toUpperCase()}${estudiante.nombre.substring(
      1,
      estudiante.nombre.length
    )} ${estudiante.apellido}</label>
    </div>`;
  });

  res.send(htmlString);
});


app.get("/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(`<h4 style='color: red;'>ID incorrecto</h4>`);
  }

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    res
      .status(400)
      .send(`<h4 style='color: red;'>No se encontró al estudiante</h4>`);
  }

  res.send(`<div>
  <label style='font-size:32px;color:blue; font-weight:bold;'>
  <span style='font-size:16px; color: black;'>${estudiante.id}</span>
  ${estudiante.nombre[0].toUpperCase()}${estudiante.nombre.substring(
    1,
    estudiante.nombre.length
  )} ${estudiante.apellido}</label>
</div>`);
});



app.post("/", (req, res) => {
  const { nombre, apellido } = req.body;
  estudiantes.push({
    id: estudiantes[estudiantes.length - 1].id + 1,
    nombre,
    apellido,
  });
  res.status(200).send("<h1 style='color: green;'>Ok</h1>");
});



app.put("/:id", (req, res) => {
  const { nombre, apellido } = req.body;
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send(`<h4 style='color: red;'>ID incorrecto</h4>`);
  }

  const index = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (index === -1) {
    res
      .status(400)
      .send(`<h4 style='color: red;'>No se encontró al estudiante</h4>`);
  }

  estudiantes[index].nombre = nombre;
  estudiantes[index].apellido = apellido;

  res.status(200).send("<h1 style='color: green;'>Ok</h1>");
});


app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send(`<h4 style='color: red;'>ID incorrecto</h4>`);
  }

  estudiantes = estudiantes.filter((estudiante) => estudiante.id !== id);
  
  res.status(200).send("<h1 style='color: green;'>Ok</h1>");
});


app.listen(port, () => {
  console.log("Ejecutando servidor de desarrollo");
});
