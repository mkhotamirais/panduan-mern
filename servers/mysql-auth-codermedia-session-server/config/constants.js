require("dotenv").config();

const { PORT: port, SESS_SECRET: secret, DATABASE: database, USER: user, PASSWORD: pass, HOST: host } = process.env;

module.exports = { port, secret, database, user, pass, host };
