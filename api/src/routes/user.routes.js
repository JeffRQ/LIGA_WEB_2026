const express = require("express");
const router = express.Router();
const {
  crearAdministrador,
  obtenerUsuarios,
} = require("../controllers/user.controller");
const validarJWT = require("../middlewares/validar-jwt");
const esAdmin = require("../middlewares/es-admin");

router.get("/", validarJWT, obtenerUsuarios);
router.post("/admin", validarJWT, esAdmin, crearAdministrador);

module.exports = router;