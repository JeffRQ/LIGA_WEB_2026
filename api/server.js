const app = require('./src/app');
const sequelize = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL correcta');

    require('./src/models/User');
    require('./src/models/Field');
    require('./src/models/Reservation');

    // Solo sincroniza sin alterar estructura existente
    await sequelize.sync();

    console.log('Tablas sincronizadas');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error.message);
  }
}

startServer();