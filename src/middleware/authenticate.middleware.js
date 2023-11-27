const jwt = require("jsonwebtoken");

function Authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      ok: false,
      err: "No tienes los permisos suficientes",
    });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (error, payload) => {
    if (error) {
      return res.status(404).json({
        ok: false,
        err: "No se pudo verificar al usuario",
      });
    }

    req.payload = payload;
    next();
  });
}

module.exports = Authenticate;
