const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect(
      `mongodb+srv://glopez:JoHrM4Wp38ptiKoh@cluster0.isdzt7a.mongodb.net/Ecommerce`
    )
    .then((res) =>
      console.log("Conectado correctamente a la base de datos de mongoose")
    )
    .catch((err) => console.log(err));
}

module.exports = connect;
