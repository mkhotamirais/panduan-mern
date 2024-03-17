const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const v1UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

v1UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error(`all fields must be filled`);
  if (!validator.isEmail(email)) throw Error(`email is not valid`);
  if (!validator.isStrongPassword(password)) throw Error(`password not strong enough`);
  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

v1UserSchema.statics.signin = async function (email, password) {
  if (!email || !password) throw Error(`all fields must be filled`);
  const match = await this.findOne({ email });
  if (!match) throw Error("incorrect email");
  const matchPwd = bcrypt.compareSync(password, match.password);
  if (!matchPwd) throw Error("incorrect password");
  return match;
};

module.exports = mongoose.model("V1User", v1UserSchema);
