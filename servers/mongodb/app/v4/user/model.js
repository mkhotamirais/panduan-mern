const mongoose = require("mongoose");

const v3userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, minLength: [3, "minimal panjang username 3 karakter"], required: true },
    email: { type: String, unique: true, minLength: [5, "minimal panjang email 3 karakter"], required: true },
    password: { type: String, minLength: [5, "minimal panjang password 3 karakter"], required: true },
    age: Number,
    refreshToken: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("v4user", v3userSchema);
