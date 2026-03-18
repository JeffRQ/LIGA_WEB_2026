const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/db");
const User = require("./src/models/User");

async function crearAdminInicial() {
  try {
    await sequelize.authenticate();
    console.log("Conexión correcta a la base de datos");

    const emailAdmin = "admin@ldccpe.com";
    const passwordPlano = "Admin1234";

    const existeAdmin = await User.findOne({
      where: { email: emailAdmin },
    });

    if (existeAdmin) {
      console.log("Ya existe un administrador con ese correo");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(passwordPlano, 10);

    const nuevoAdmin = await User.create({
      nombre: "Administrador General",
      email: emailAdmin,
      password: passwordHash,
      rol: "admin",
    });

    console.log("Administrador creado correctamente:");
    console.log({
      id: nuevoAdmin.id,
      nombre: nuevoAdmin.nombre,
      email: nuevoAdmin.email,
      rol: nuevoAdmin.rol,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error al crear administrador:", error.message);
    process.exit(1);
  }
}

crearAdminInicial();
