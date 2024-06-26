const { DataTypes } = require("sequelize");
const conn = require("../../../config");

const V5User = conn.define(
  "V5User",
  {
    uuid: { type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, validate: { notEmpty: true } },
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, len: [3, 100] } },
    email: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user", validate: { notEmpty: true } },
  },
  { freezeTableName: true }
);

module.exports = V5User;
