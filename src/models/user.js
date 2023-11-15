const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  passwordHash: String,
  photoUrl: String,
  creation: {
    type: Date,
    default: Date.now,
  },
  blocked: {
    default: false,
    type: Boolean,
  },
});

module.exports = mongoose.model("user", userSchema);
