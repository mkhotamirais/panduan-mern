require("dotenv").config();

const { PORT: port, ACCESS_TOKEN_SECRET: ats, REFRESH_TOKEN_SECRET: rts, MONGO_URI: uri } = process.env;

module.exports = { port, ats, rts, uri };
