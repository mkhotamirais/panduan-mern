const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = new Schema({
  name: {
    type: String,
    nim: [5, "Panjang nama makanan minimal 5 karakter"],
    required: [true, "Nama makanan harus diisi"],
  },
  price: {
    type: Number,
    required: [true, "Harga item harus diisi"],
  },
  qty: {
    type: Number,
    required: [true, "Qty harus diisi"],
    min: [1, "qty minimal 1"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);
