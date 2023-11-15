const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  nombre: String,
  apellido: String,
  creation: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("student", studentSchema);
