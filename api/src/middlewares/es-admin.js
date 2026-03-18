const esAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res.status(403).json({
      ok: false,
      mensaje: "Acceso solo para administradores",
    });
  }

  next();
};

module.exports = esAdmin;
