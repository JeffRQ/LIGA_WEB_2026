const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Field = require('./Field');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activa',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  field_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'reservations',
  timestamps: true,
});

Reservation.belongsTo(User, { foreignKey: 'user_id' });
Reservation.belongsTo(Field, { foreignKey: 'field_id' });

module.exports = Reservation;