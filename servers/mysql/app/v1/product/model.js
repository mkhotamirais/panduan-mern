const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V1Product = conn.define(
  "V1Product",
  {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // // sebenarnya id sudah otomatis dibuatkan, jadi tidak ditambah id juga tidak apa apa
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = V1Product;
