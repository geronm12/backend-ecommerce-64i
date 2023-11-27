const TaskSchema = require("../models/tasks");
const UserSchema = require("../models/user");
const { Types } = require("mongoose");

async function addTask(req, res) {
  try {
    const { _id } = req.payload;
    const { title, description, urgent } = req.body;

    const createdTask = await TaskSchema.create({
      description,
      title,
      urgent,
    });

    const user = await UserSchema.findById(_id);

    user.tasks.push(new Types.ObjectId(createdTask._id));

    await user.save();

    return res.status(200).json({
      ok: true,
      data: createdTask,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      error_msg: ex.message,
    });
  }
}

//paginación
async function getAllTasks(req, res) {
  try {
    const { _id } = req.payload;
    const { page } = req.query;

    const result = await TaskSchema.find({ user_id: _id, active: true })
      .skip((page - 1) * process.env.MAX_PAGE_DOCS)
      .limit(process.env.MAX_PAGE_DOCS);
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (ex) {
    return res.status(400).json({ ok: false, error_msg: ex.message });
  }
}

async function updateTasks(req, res) {
  try {
    const { title, description, urgent } = req.body;
    const updatedTask = await TaskSchema.findByIdAndUpdate(id, {
      title,
      description,
      urgent,
    });
    return res.status(200).json({
      ok: true,
      data: updatedTask,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      error_msg: ex.message,
    });
  }
}

async function changeTaskState(req, res) {
  try {
    const { newState } = req.body;
    const updatedTask = await TaskSchema.findByIdAndUpdate(id, {
      state: newState,
    });
    return res.status(200).json({
      ok: true,
      data: updatedTask,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      error_msg: ex.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params.id;
    await TaskSchema.findByIdAndUpdate(id, {
      active: false,
    });
    return res.status(200).json({
      ok: true,
    });
  } catch (ex) {
    return res.status(400).json({ ok: false, error_msg: ex.message });
  }
}

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  updateTasks,
  changeTaskState,
};
