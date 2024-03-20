const { Schema, model } = require("mongoose");

const v2UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: Array, default: ["employee"] },
    active: { type: Boolean, default: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female"] },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = model("V2User", v2UserSchema);
