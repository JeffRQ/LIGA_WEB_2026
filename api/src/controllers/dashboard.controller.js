const User = require("../models/User");
const Field = require("../models/Field");
const Reservation = require("../models/Reservation");
const { Op, fn, col } = require("sequelize");

const obtenerEstadisticasDashboard = async (req, res) => {
  try {
    const ahora = new Date();

    const inicioDia = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      0,
      0,
      0,
      0
    );

    const finDia = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      23,
      59,
      59,
      999
    );

    const fechaHoyTexto = `${ahora.getFullYear()}-${String(
      ahora.getMonth() + 1
    ).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;

    const totalUsuarios = await User.count();
    const totalCanchas = await Field.count();
    const totalReservas = await Reservation.count();

    let reservasHoy = await Reservation.count({
      where: {
        fecha: fechaHoyTexto,
      },
    });

    if (!reservasHoy) {
      reservasHoy = await Reservation.count({
        where: {
          fecha: {
            [Op.between]: [inicioDia, finDia],
          },
        },
      });
    }

    const reservasPendientes = await Reservation.count({
      where: {
        estado: "pending",
      },
    });

    const reservasActivas = await Reservation.count({
      where: {
        estado: {
          [Op.in]: ["active", "pending"],
        },
      },
    });

    const ultimasReservasDB = await Reservation.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["nombre"],
          required: false,
        },
        {
          model: Field,
          attributes: ["nombre"],
          required: false,
        },
      ],
    });

    const ultimasReservas = ultimasReservasDB.map((reserva) => ({
      id: reserva.id,
      usuario: reserva.User?.nombre || `Usuario ${reserva.user_id}`,
      cancha: reserva.Field?.nombre || `Cancha ${reserva.field_id}`,
      fecha: reserva.fecha,
      hora_inicio: reserva.hora_inicio,
      hora_fin: reserva.hora_fin,
      estado: reserva.estado,
    }));

    const canchasPopularesDB = await Reservation.findAll({
      attributes: ["field_id", [fn("COUNT", col("field_id")), "total"]],
      include: [
        {
          model: Field,
          attributes: ["nombre"],
          required: false,
        },
      ],
      group: ["field_id", "Field.id", "Field.nombre"],
      order: [[fn("COUNT", col("field_id")), "DESC"]],
      limit: 5,
    });

    const canchasPopulares = canchasPopularesDB.map((item) => ({
      nombre: item.Field?.nombre || `Cancha ${item.field_id}`,
      total: Number(item.dataValues.total || 0),
    }));

    return res.json({
      ok: true,
      totales: {
        usuarios: totalUsuarios,
        canchas: totalCanchas,
        reservas: totalReservas,
        reservasHoy,
        pendientes: reservasPendientes,
        activas: reservasActivas,
      },
      ultimasReservas,
      canchasPopulares,
    });
  } catch (error) {
    console.error("ERROR EN DASHBOARD:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener estadísticas del dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerEstadisticasDashboard,
};