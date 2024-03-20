const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

let UserSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "Nama harus diisi"],
      maxlength: [255, "Panjang nama harus antara 3-255 karakter"],
      minlength: [3, "Panjang nama harus antara 3-255 karakter"],
    },
    // customer_id: Number,
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      maxlength: [255, "Panjang password maksimal 255 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "guest"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

UserSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid`
);

UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = bcrypt.genSaltSync(10);
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

// UserSchema.plugin(AutoIncrement, {
//   inc_field: "customer_id",
// });

module.exports = model("User", UserSchema);
