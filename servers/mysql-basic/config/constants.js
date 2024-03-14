require("dotenv").config();

const { PORT: port, DATABASE: db, USER: user, PASSWORD: pass, HOST: host } = process.env;

module.exports = { port, db, user, pass, host };
