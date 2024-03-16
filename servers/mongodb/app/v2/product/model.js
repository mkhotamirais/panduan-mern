const mongoose = require("mongoose");

const v2productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minLength: [3, "panjang produk minimal 3 karakter"], required: true },
    price: { type: String, required: true },
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "v2category", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("v2product", v2productSchema);
