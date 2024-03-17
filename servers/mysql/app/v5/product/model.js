const { DataTypes } = require("sequelize");
const conn = require("../../../config");
const V5User = require("../user/model");

const V5Product = conn.define(
  "V5Product",
  {
    uuid: { type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, validate: { notEmpty: true } },
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, len: [3, 100] } },
    price: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true } },
    userId: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true } },
  },
  { freezeTableName: true }
);

V5User.hasMany(V5Product, { foreignKey: "userId" });
V5Product.belongsTo(V5User, { foreignKey: "userId" });

module.exports = V5Product;
