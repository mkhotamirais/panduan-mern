require("dotenv").config();

const { PORT: port, DATABASE: db, USER: user, HOST: host, PASSWORD: pass } = process.env;

module.exports = { port, db, user, host, pass };
