const { DataTypes } = require("sequelize");
const conn = require("../../config");

const User = conn.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    image_name: DataTypes.STRING,
    image_url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
