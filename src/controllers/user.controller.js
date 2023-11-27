const { Hash, Compare } = require("../helpers/password.helper");
const UserSchema = require("../models/user");
const { UploadPicture } = require("./cloudinary.controller");

async function getUsers(req, res) {
  const users = await UserSchema.find();
  res.send(JSON.stringify(users));
}

async function createUser(req, res) {
  //pepito
  try {
    const { email, password } = req.body;
    const hashedPassword = await Hash(password);

    const newUser = await UserSchema.create({
      email,
      passwordHash: hashedPassword,
    });

    res.status(200).json({
      ok: true,
      data: newUser,
    });
  } catch (ex) {
    res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.find({ email: email }).exec();

    if (user) {
      const result = await Compare(password, user[0].passwordHash);

      if (result) {
        res.status(200).json({
          ok: true,
          logged: result,
          token: user[0].generateAccesToken(),
        });
      } else {
        throw new Error("Usuario o contraseña incorrectos.");
      }
    }
  } catch (ex) {
    res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { payload } = req;

    const { _id } = payload;

    const { secure_url } = await UploadPicture(req.files.file[0]);
    console.log(secure_url);
    const response = await UserSchema.findByIdAndUpdate(_id, {
      photoUrl: secure_url,
    });

    res.status(200).json({
      ok: true,
      data: response,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

async function getProfile(req, res) {
  try {
    const { payload } = req;
    _id = payload._id;
    const user = await UserSchema.findById(_id).populate("tasks");

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      error_msg: ex.message,
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  login,
  updateUser,
  getProfile,
};
