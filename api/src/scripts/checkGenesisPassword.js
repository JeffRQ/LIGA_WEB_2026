const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const User = require("../models/User");

async function checkGenesisPassword() {
  try {
    await sequelize.authenticate();

    const user = await User.findOne({
      where: { email: "genesis_lorena12@outlook.es" },
    });

    if (!user) {
      console.log("Usuario no encontrado");
      process.exit(0);
    }

    const ok = await bcrypt.compare("Zambrano12", user.password);

    console.log("¿La contraseña coincide?:", ok);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkGenesisPassword();