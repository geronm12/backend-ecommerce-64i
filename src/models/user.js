const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

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
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

userSchema.methods.generateAccesToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY);
  return token;
};

module.exports = mongoose.model("user", userSchema);
