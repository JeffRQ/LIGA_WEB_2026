const express = require("express");
const router = express.Router();
const {
  obtenerEstadisticasDashboard,
} = require("../controllers/dashboard.controller");
const validarJWT = require("../middlewares/validar-jwt");

router.get("/stats", validarJWT, obtenerEstadisticasDashboard);

module.exports = router;