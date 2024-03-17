require("dotenv").config();
const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const { PORT: port, DATABASE: db, USER: user, PASSWORD: pass, HOST: host } = process.env;

module.exports = { port, db, user, pass, host, rootPath };
