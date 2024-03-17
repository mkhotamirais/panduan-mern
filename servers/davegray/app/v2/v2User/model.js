const { Schema, model } = require("mongoose");

const v2UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("V2User", v2UserSchema);
