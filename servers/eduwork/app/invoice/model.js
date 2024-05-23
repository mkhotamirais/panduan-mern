const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    sub_total: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    delivery_address: {
      provinsi: { type: String, required: true },
      kabupaten: { type: String, required: true },
      kecamatan: { type: String, required: true },
      kelurahan: { type: String, required: true },
      detail: { type: String },
    },
    total: { type: Number, required: true },
    payment_status: { type: String, enum: ["waiting_payment", "paid"], default: "waiting_payment" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
