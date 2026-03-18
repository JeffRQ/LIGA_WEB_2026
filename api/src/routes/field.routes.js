const express = require("express");
const router = express.Router();
const {
  obtenerCanchas,
  crearCancha,
  actualizarCancha,
  eliminarCancha,
} = require("../controllers/field.controller");

const validarJWT = require("../middlewares/validar-jwt");
const esAdmin = require("../middlewares/es-admin");

router.get("/", obtenerCanchas);
router.post("/", validarJWT, esAdmin, crearCancha);
router.put("/:id", validarJWT, esAdmin, actualizarCancha);
router.delete("/:id", validarJWT, esAdmin, eliminarCancha);

module.exports = router;
