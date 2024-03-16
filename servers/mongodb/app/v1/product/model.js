const mongoose = require("mongoose");

const v1productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, minLength: [3, "panjang produk minimal 3 karakter"] },
    price: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("v1product", v1productSchema);
