const mongoose = require("mongoose");
const { uri } = require("./constants");

// const db = async () => {
//   try {
//     await mongoose.connect(uri);
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = db;

const db = mongoose.connect(uri);

module.exports = db;
