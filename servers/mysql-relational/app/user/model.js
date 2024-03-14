const { DataTypes } = require("sequelize");
const conn = require("../../config");

const User = conn.define(
  "User",
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

module.exports = User;
