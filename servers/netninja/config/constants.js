require("dotenv").config();

const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN: at, REFRESH_TOKEN: rt } = process.env;

module.exports = { port, uri, at, rt };
