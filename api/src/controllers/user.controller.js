const bcrypt = require("bcryptjs");
const User = require("../models/User");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "nombre", "email", "rol"],
    });

    return res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

const crearAdministrador = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: "Nombre, email y contraseña son obligatorios",
      });
    }

    const existeUsuario = await User.findOne({
      where: { email },
    });

    if (existeUsuario) {
      return res.status(400).json({
        ok: false,
        mensaje: "El correo ya está registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoAdmin = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: "admin",
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Administrador creado correctamente",
      usuario: {
        id: nuevoAdmin.id,
        nombre: nuevoAdmin.nombre,
        email: nuevoAdmin.email,
        rol: nuevoAdmin.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear administrador",
      error: error.message,
    });
  }
};

module.exports = {
  crearAdministrador,
  obtenerUsuarios,
};