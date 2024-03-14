const { Sequelize } = require("sequelize");
const { db, user, pass, host } = require("./constants");

const conn = new Sequelize(db, user, pass, { host, dialect: "mysql", logging: console.log(`Connect to ${db}`) });

module.exports = conn;
