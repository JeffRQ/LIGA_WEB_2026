const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const User = require("../models/User");

async function resetGenesisPassword() {
  try {
    await sequelize.authenticate();
    console.log("Conexión correcta a PostgreSQL");

    const user = await User.findOne({
      where: { email: "genesis_lorena12@outlook.es" },
    });

    if (!user) {
      console.log("No existe Genesis en la base de datos");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash("Zambrano12", 10);

    await user.update({
      nombre: "Genesis Lorena Zambrano Toalongo",
      password: passwordHash,
      rol: "STAFF",
    });

    console.log("Contraseña de Genesis actualizada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al resetear contraseña:", error.message);
    process.exit(1);
  }
}

resetGenesisPassword();