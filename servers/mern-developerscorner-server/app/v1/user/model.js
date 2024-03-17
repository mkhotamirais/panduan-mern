const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const v1userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: { type: Array, default: [] },
    address: [{ type: ObjectId, ref: "v1address" }],
    wishlist: [{ type: ObjectId, ref: "v1product" }],
    accessToken: String,
  },
  {
    timestamps: true,
  }
);

// v1userSchema.pre("save", async (next) => {
//   const salt = genSaltSync(10);
//   this.password = hashSync(this.password, salt);
// });

// v1userSchema.method.isPasswordMatched = async (password) => {
//   return compareSync(password, this.password);
// };

module.exports = mongoose.model("v1user", v1userSchema);
