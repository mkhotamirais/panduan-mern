const { DataTypes } = require("sequelize");
const conn = require("../../../config");
const V2User = require("../user/model");

const V2Product = conn.define(
  "V2Product",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

V2User.hasMany(V2Product, { foreignKey: "userId" });
V2Product.belongsTo(V2User, { foreignKey: "userId" });

module.exports = V2Product;
