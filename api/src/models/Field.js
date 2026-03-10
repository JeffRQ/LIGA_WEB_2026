const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Field = sequelize.define('Field', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'disponible',
  },
}, {
  tableName: 'fields',
  timestamps: true,
});

module.exports = Field;