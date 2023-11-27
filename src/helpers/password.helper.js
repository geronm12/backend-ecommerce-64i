const bcrypt = require("bcrypt");

const Hash = async (password) => await bcrypt.hash(password, process.env.SALT);

const Compare = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { Hash, Compare };
