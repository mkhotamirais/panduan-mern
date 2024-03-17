require("dotenv").config();

const { PORT: port, MONGO_URI: mongoUri, ACCESS_TOKEN_KEY: atk, REFRESH_TOKEN_KEY: rtk } = process.env;

module.exports = { port, mongoUri, atk, rtk };
