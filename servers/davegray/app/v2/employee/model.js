const { Schema, model } = require("mongoose");

const v2EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "nama employee harus diisi"],
      minLength: [3, "panjang minimal 3 karakter"],
    },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("v2Employee", v2EmployeeSchema);
