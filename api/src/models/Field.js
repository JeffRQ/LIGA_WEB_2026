const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Field = sequelize.define(
  "Field",
  {
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
      defaultValue: "Disponible",
    },
  },
  {
    tableName: "fields",
    timestamps: true,
  }
);

module.exports = Field;