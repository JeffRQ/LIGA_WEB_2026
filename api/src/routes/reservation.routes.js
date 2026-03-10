const express = require('express');
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  eliminarReserva
} = require('../controllers/reservation.controller');

router.get('/', obtenerReservas);
router.post('/', crearReserva);
router.delete('/:id', eliminarReserva);

module.exports = router;