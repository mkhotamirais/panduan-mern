require("dotenv").config();

const { PORT: port, MONGODB_URI: uri } = process.env;

module.exports = { port, uri };
