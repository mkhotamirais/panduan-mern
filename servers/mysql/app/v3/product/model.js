const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V3Product = conn.define(
  "V3Product",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    imageName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = V3Product;
