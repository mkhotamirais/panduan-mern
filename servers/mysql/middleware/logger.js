const path = require("path");
const fs = require("fs");
const { rootPath } = require("../config/constants");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const logger = (message, fileName) => {
  const content = `${format(new Date(), "yyyymmdd-hh:mm:ss")}\t${uuidv4()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(rootPath, "logs"))) fs.mkdirSync(path.join(rootPath, "logs"));
    fs.appendFileSync(path.join(rootPath, "logs", fileName), content);
  } catch (error) {
    console.log(error);
  }
};

const logSuccess = (req, res, next) => {
  logger(`${req.method}\t${req.url}\t${req.headers.origin}`, "log-success.log");
  console.log(`${req.method}\t${req.url}\t${req.headers.origin}`);
  next();
};

const logError = (err, req, res, next) => {
  logger(`${err.name}: ${err.message}`, "log-error.log");
  console.log(`${err.name}: ${err.message}`);
  next();
};

module.exports = { logSuccess, logError };
