const express = require("express");
const router = express.Router();
const {
  obtenerCanchas,
  crearCancha,
  actualizarCancha,
  eliminarCancha,
} = require("../controllers/field.controller");

router.get("/", obtenerCanchas);
router.post("/", crearCancha);
router.put("/:id", actualizarCancha);
router.delete("/:id", eliminarCancha);

module.exports = router;