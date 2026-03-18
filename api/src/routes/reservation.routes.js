const express = require("express");
const router = express.Router();
const {
  obtenerReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reservation.controller");

const validarJWT = require("../middlewares/validar-jwt");
const esAdmin = require("../middlewares/es-admin");

router.get("/", validarJWT, obtenerReservas);
router.post("/", validarJWT, crearReserva);
router.put("/:id", validarJWT, esAdmin, actualizarReserva);
router.delete("/:id", validarJWT, eliminarReserva);

module.exports = router;
