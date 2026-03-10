const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Field = require("../models/Field");
const { Op } = require("sequelize");

const crearReserva = async (req, res) => {
  try {
    const { fecha, hora_inicio, hora_fin, user_id, field_id } = req.body;

    if (!fecha || !hora_inicio || !hora_fin || !user_id || !field_id) {
      return res.status(400).json({
        ok: false,
        mensaje: "Todos los campos son obligatorios",
      });
    }

    if (hora_fin <= hora_inicio) {
      return res.status(400).json({
        ok: false,
        mensaje: "La hora fin debe ser mayor a la hora inicio",
      });
    }

    const conflicto = await Reservation.findOne({
      where: {
        fecha,
        field_id,
        [Op.and]: [
          { hora_inicio: { [Op.lt]: hora_fin } },
          { hora_fin: { [Op.gt]: hora_inicio } },
        ],
      },
    });

    if (conflicto) {
      return res.status(409).json({
        ok: false,
        mensaje: "Ya existe una reserva en ese horario para esa cancha",
      });
    }

    const nuevaReserva = await Reservation.create({
      fecha,
      hora_inicio,
      hora_fin,
      user_id,
      field_id,
      estado: "activa",
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Reserva creada correctamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear la reserva",
      error: error.message,
    });
  }
};

const obtenerReservas = async (req, res) => {
  try {
    const { fecha, field_id } = req.query;

    const where = {};

    if (fecha) where.fecha = fecha;
    if (field_id) where.field_id = field_id;

    const reservas = await Reservation.findAll({
      where,
      include: [
        { model: User, attributes: ["id", "nombre", "email"] },
        { model: Field, attributes: ["id", "nombre", "tipo", "estado"] },
      ],
      order: [
        ["fecha", "ASC"],
        ["hora_inicio", "ASC"],
      ],
    });

    return res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener las reservas",
      error: error.message,
    });
  }
};

const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora_inicio, hora_fin, field_id, estado } = req.body;

    const reserva = await Reservation.findByPk(id);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        mensaje: "Reserva no encontrada",
      });
    }

    const nuevaFecha = fecha ?? reserva.fecha;
    const nuevaHoraInicio = hora_inicio ?? reserva.hora_inicio;
    const nuevaHoraFin = hora_fin ?? reserva.hora_fin;
    const nuevoFieldId = field_id ?? reserva.field_id;

    if (nuevaHoraFin <= nuevaHoraInicio) {
      return res.status(400).json({
        ok: false,
        mensaje: "La hora fin debe ser mayor a la hora inicio",
      });
    }

    const conflicto = await Reservation.findOne({
      where: {
        id: { [Op.ne]: id },
        fecha: nuevaFecha,
        field_id: nuevoFieldId,
        [Op.and]: [
          { hora_inicio: { [Op.lt]: nuevaHoraFin } },
          { hora_fin: { [Op.gt]: nuevaHoraInicio } },
        ],
      },
    });

    if (conflicto) {
      return res.status(409).json({
        ok: false,
        mensaje: "Ya existe una reserva en ese horario para esa cancha",
      });
    }

    await reserva.update({
      fecha: nuevaFecha,
      hora_inicio: nuevaHoraInicio,
      hora_fin: nuevaHoraFin,
      field_id: nuevoFieldId,
      estado: estado ?? reserva.estado,
    });

    return res.json({
      ok: true,
      mensaje: "Reserva actualizada correctamente",
      reserva,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al actualizar la reserva",
      error: error.message,
    });
  }
};

const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await Reservation.findByPk(id);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        mensaje: "Reserva no encontrada",
      });
    }

    await reserva.destroy();

    return res.json({
      ok: true,
      mensaje: "Reserva eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al eliminar la reserva",
      error: error.message,
    });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  actualizarReserva,
  eliminarReserva,
};