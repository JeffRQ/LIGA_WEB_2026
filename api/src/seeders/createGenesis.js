const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createGenesis() {
  const passwordHash = await bcrypt.hash("Zambrano12", 10);

  const existe = await User.findOne({
    where: { email: "genesis_lorena12@outlook.es" },
  });

  if (!existe) {
    await User.create({
      nombre: "Genesis Lorena Zambrano Toalongo",
      email: "genesis_lorena12@outlook.es",
      password: passwordHash,
      rol: "admin",
    });

    console.log("Usuario Genesis creado correctamente");
  } else {
    await existe.update({
      nombre: "Genesis Lorena Zambrano Toalongo",
      password: passwordHash,
      rol: "admin",
    });

    console.log("Usuario Genesis actualizado correctamente");
  }
}

module.exports = createGenesis;