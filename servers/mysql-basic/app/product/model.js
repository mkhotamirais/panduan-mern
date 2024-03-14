const { DataTypes } = require("sequelize");
const conn = require("../../config");

const Product = conn.define(
  "Product",
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

module.exports = Product;
