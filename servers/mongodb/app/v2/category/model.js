const mongoose = require("mongoose");

const v2categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, minLength: [3, "panjang produk minimal 3 karakter"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("v2category", v2categorySchema);
