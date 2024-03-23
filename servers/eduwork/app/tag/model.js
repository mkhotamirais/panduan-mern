const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: [3, "Panjang nama tag minimal 3 karakter"],
      maxLength: [20, "Panjang nama tag minimal 20 karakter"],
      required: [true, "Nama tag harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Tag", TagSchema);
