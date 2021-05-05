const { DataTypes } = require("sequelize");

const Database = require("../database/database");

const { sequelize } = new Database();

module.exports = sequelize.define("RentRegister", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  idMovie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
