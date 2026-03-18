const express = require("express");
const router = express.Router();
const {
  obtenerPartidosHome,
  obtenerPartidosEnVivo,
  obtenerTablaPosiciones,
} = require("../controllers/sports.controller");

router.get("/home", obtenerPartidosHome);
router.get("/live", obtenerPartidosEnVivo);
router.get("/standings", obtenerTablaPosiciones);

module.exports = router;