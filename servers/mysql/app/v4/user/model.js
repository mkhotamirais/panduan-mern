const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V4User = conn.define(
  "V4User",
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    refresh_token: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: "user" },
  },
  {
    freezeTableName: true,
  }
);

module.exports = V4User;
