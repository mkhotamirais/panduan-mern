const mongoose = require("mongoose");
const { mongoUri } = require("./constants");

const db = mongoose.connect(mongoUri);

module.exports = db;
