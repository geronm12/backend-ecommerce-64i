const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect(process.env.CONNECTION_STRINGS)
    .then((res) =>
      console.log("Conectado correctamente a la base de datos de mongoose")
    )
    .catch((err) => console.log(err));
}

module.exports = connect;
