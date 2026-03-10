const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API LDCCPE funcionando correctamente' });
});

const authRoutes = require('./routes/auth.routes');
const reservationRoutes = require('./routes/reservation.routes');
const fieldRoutes = require('./routes/field.routes');

app.use('/api/fields', fieldRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

module.exports = app;