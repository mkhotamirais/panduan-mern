const mongoose = require("mongoose");

const v3productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minLength: [3, "Panjang minimal produk 3 karakter"], required: true },
    price: { type: Number, required: true },
    imageName: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("v3product", v3productSchema);
