const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, minLength: [3, "Panjang minimal 3 karakter"], required: [true, "Harus diisi"], unique: true },
    price: { type: Number, default: 0 },
    description: { type: String, min: [1000, "Panjang deskripsi maksimal 1000 karakter"] },
    imageName: String,
    imageUrl: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
