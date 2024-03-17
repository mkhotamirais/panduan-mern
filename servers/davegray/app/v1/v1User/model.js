const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username harus diisi"],
      min: [3, "panjang minimal 3 karakter"],
    },
    email: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
