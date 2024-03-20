const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const logEvents = (message, fileName) => {
  const logItem = `${format(new Date(), "yyyyMMdd-HH:mm:ss")}\t${uuidv4()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) fs.mkdirSync(path.join(__dirname, "..", "logs"));
    fs.appendFileSync(path.join(__dirname, "..", "logs", fileName), logItem);
  } catch (error) {
    console.log(error);
  }
};

const logSuccess = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "log-success.log");
  console.log(`${req.method}\t${req.path}`);
  next();
};

const logError = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "log-error.log");
  console.log(err.stack);
  res.status(500).json({ message: err.message });
};

module.exports = { logEvents, logSuccess, logError };
