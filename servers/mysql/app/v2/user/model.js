const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V2User = conn.define(
  "V2User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

module.exports = V2User;
