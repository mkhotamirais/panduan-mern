const { Sequelize } = require("sequelize");
const { database, user, pass, host } = require("./constants");

const db = new Sequelize(database, user, pass, { host, dialect: "mysql", logging: console.log("Database connected") });

module.exports = db;
