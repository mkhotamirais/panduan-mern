const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V4Product = conn.define(
  "V4Product",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    price: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true } },
    description: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = V4Product;
