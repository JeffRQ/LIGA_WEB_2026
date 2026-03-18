const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Field = require("../models/Field");
const { Op } = require("sequelize");

const obtenerReservas = async (req, res) => {
  try {
    const { fecha, field_id } = req.query;

    const where = {};

    if (fecha) {
      where.fecha = fecha;
    }

    if (field_id) {
      where.field_id = field_id;
    }

    const reservas = await Reservation.findAll({
      where,
      include: [
        {
          model: User,
          required: false,
          attributes: ["nombre", "email"],
        },
        {
          model: Field,
          required: false,
          attributes: ["nombre", "tipo"],
        },
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
    console.error("ERROR EN obtenerReservas:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener reservas",
      error: error.message,
    });
  }
};

const crearReserva = async (req, res) => {
  try {
    const { fecha, hora_inicio, hora_fin, field_id } = req.body;
    const user_id = req.usuario.id;

    if (!fecha || !hora_inicio || !hora_fin || !field_id) {
      return res.status(400).json({
        ok: false,
        mensaje: "Todos los campos son obligatorios",
      });
    }

    const conflicto = await Reservation.findOne({
      where: {
        fecha,
        field_id,
        [Op.or]: [
          {
            hora_inicio: {
              [Op.between]: [hora_inicio, hora_fin],
            },
          },
          {
            hora_fin: {
              [Op.between]: [hora_inicio, hora_fin],
            },
          },
          {
            [Op.and]: [
              { hora_inicio: { [Op.lte]: hora_inicio } },
              { hora_fin: { [Op.gte]: hora_fin } },
            ],
          },
        ],
      },
    });

    if (conflicto) {
      return res.status(400).json({
        ok: false,
        mensaje: "Ya existe una reserva en ese horario para esa cancha",
      });
    }

    const nuevaReserva = await Reservation.create({
      fecha,
      hora_inicio,
      hora_fin,
      estado: "pending",
      user_id,
      field_id,
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Reserva creada correctamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error("ERROR EN crearReserva:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear la reserva",
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

    await reserva.update({
      fecha: fecha ?? reserva.fecha,
      hora_inicio: hora_inicio ?? reserva.hora_inicio,
      hora_fin: hora_fin ?? reserva.hora_fin,
      field_id: field_id ?? reserva.field_id,
      estado: estado ?? reserva.estado,
    });

    return res.json({
      ok: true,
      mensaje: "Reserva actualizada correctamente",
      reserva,
    });
  } catch (error) {
    console.error("ERROR EN actualizarReserva:", error);
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

    const usuarioLogueado = req.usuario;
    const esAdministrador = usuarioLogueado.rol === "admin";
    const esPropietario =
      Number(reserva.user_id) === Number(usuarioLogueado.id);

    if (!esAdministrador && !esPropietario) {
      return res.status(403).json({
        ok: false,
        mensaje: "No tienes permiso para eliminar esta reserva",
      });
    }

    await reserva.destroy();

    return res.json({
      ok: true,
      mensaje: "Reserva eliminada correctamente",
    });
  } catch (error) {
    console.error("ERROR EN eliminarReserva:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error al eliminar la reserva",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
};
