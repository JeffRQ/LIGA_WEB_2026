const Field = require("../models/Field");

const obtenerCanchas = async (req, res) => {
  try {
    const canchas = await Field.findAll({
      order: [["id", "ASC"]],
    });

    return res.json({
      ok: true,
      canchas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener las canchas",
      error: error.message,
    });
  }
};

const crearCancha = async (req, res) => {
  try {
    const { nombre, tipo, estado, precio } = req.body;

    if (!nombre || !tipo) {
      return res.status(400).json({
        ok: false,
        mensaje: "Nombre y tipo son obligatorios",
      });
    }

    const nuevaCancha = await Field.create({
      nombre,
      tipo,
      estado: estado || "Disponible",
      precio: precio || 0,
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Cancha creada correctamente",
      cancha: nuevaCancha,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear la cancha",
      error: error.message,
    });
  }
};

const actualizarCancha = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, estado, precio } = req.body;

    const cancha = await Field.findByPk(id);

    if (!cancha) {
      return res.status(404).json({
        ok: false,
        mensaje: "Cancha no encontrada",
      });
    }

    await cancha.update({
      nombre: nombre ?? cancha.nombre,
      tipo: tipo ?? cancha.tipo,
      estado: estado ?? cancha.estado,
      precio: precio ?? cancha.precio,
    });

    return res.json({
      ok: true,
      mensaje: "Cancha actualizada correctamente",
      cancha,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al actualizar la cancha",
      error: error.message,
    });
  }
};

const eliminarCancha = async (req, res) => {
  try {
    const { id } = req.params;

    const cancha = await Field.findByPk(id);

    if (!cancha) {
      return res.status(404).json({
        ok: false,
        mensaje: "Cancha no encontrada",
      });
    }

    await cancha.destroy();

    return res.json({
      ok: true,
      mensaje: "Cancha eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al eliminar la cancha",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerCanchas,
  crearCancha,
  actualizarCancha,
  eliminarCancha,
};