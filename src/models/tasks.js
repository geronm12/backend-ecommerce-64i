const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: {
    require: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  urgent: Boolean,
  state: {
    type: String,
    enum: ["New", "Doing", "Done"],
    default: "New",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
