require("dotenv").config();
const path = require("path");

const { PORT: port, DATABASE: db, USER: user, PASSWORD: pass, HOST: host } = process.env;
const rootPath = path.resolve(__dirname, "..");

module.exports = { port, db, user, pass, host, rootPath };
