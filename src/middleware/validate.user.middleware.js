function ValidateUser(req, res, next) {
  const { email, password } = req.body;

  if (email === null || email === "" || email === undefined) {
    res.status(400).json({
      ok: false,
      err: "El email es obligatorio",
    });
  }

  if (password === null || password === "" || password === undefined) {
    res.status(400).json({
      ok: false,
      err: "La contraseña es obligatoria",
    });
  }

  next();
}

module.exports = ValidateUser;
