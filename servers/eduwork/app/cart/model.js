const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = new Schema({
  name: { type: String, min: [5, "Panjang nama makanan niminal 50 karakter"], required: [true, "Nama makanan harus diisi"] },
  qty: { type: Number, requierd: [true, "qty harus diisi"], min: [1, "Minimal qty adalah 1"] },
  price: { type: Number, default: 0 },
  image_url: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = model("CartItem", cartItemSchema);
