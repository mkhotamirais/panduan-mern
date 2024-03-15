const { DataTypes } = require("sequelize");
const conn = require("../../config");

const Product = conn.define(
  "Product",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    price: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true } },
    description: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Product;
