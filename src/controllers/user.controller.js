const UserSchema = require("../models/user");

async function getUsers(req, res) {
  const users = await UserSchema.find();
  console.log(users);
  res.send(JSON.stringify(users));
}

module.exports = {
  getUsers,
};
