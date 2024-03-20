require("dotenv").config();

const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN_SECRET: ats, REFRESH_TOKEN_SECRET: rts } = process.env;

module.exports = { port, uri, ats, rts };
