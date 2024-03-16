require("dotenv").config();
const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN_SECRET: ats, REFRESH_TOKEN_SECRET: rts } = process.env;

module.exports = { port, rootPath, uri, ats, rts };
