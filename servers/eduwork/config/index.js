const mongoose = require("mongoose");
const { uri } = require("./constants");
// const { dbUser, dbPass, dbHost, dbPort } = require("./constants");

// mongoose.connect(`mongodb://${dbUser}/${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
// const db = mongoose.connection;

mongoose.connect(uri);
const db = mongoose.connection;

module.exports = db;
