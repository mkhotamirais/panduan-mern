require("dotenv").config();
const path = require("path");

const rootPath = path.resolve(__dirname, "..");

const {
  MONGO_URI: uri,
  SECRET_KEY: secretKey,
  SERVICE_NAME: serviceName,
  DB_HOST: dbHost,
  DB_PORT: dbPort,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  DB_NAME: dbName,
} = process.env;

module.exports = { rootPath, uri, secretKey, serviceName, dbHost, dbUser, dbPass, dbName, dbPort };
