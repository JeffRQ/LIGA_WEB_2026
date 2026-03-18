const sequelize = require("./src/config/db");
const User = require("./src/models/User");

async function verAdmin() {
  try {
    await sequelize.authenticate();

    const usuarios = await User.findAll({
      attributes: ["id", "nombre", "email", "rol"],
    });

    console.log("Usuarios encontrados:");
    console.table(
      usuarios.map((u) => ({
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        rol: u.rol,
      }))
    );

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

verAdmin();
