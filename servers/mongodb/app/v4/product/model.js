const mongoose = require("mongoose");

const v4productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minLength: [3, "panjang produk minimal 3 karakter"], required: true },
    price: { type: Number, min: [3, "panjang harga minimal 3 digit"], required: true },
    description: String,
    imageUrl: String,
    imageName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("v4product", v4productSchema);
