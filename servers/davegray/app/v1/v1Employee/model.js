const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "nama employee harus diisi"],
      min: [3, "panjang minimal 3 karakter"],
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Employee", employeeSchema);
