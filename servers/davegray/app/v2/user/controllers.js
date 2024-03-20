const User = require("./model");
const Note = require("../note/model");
const { hashSync, genSaltSync } = require("bcrypt");
const { badRequest, ok, conflict } = require("../../utils");
const { isValidObjectId } = require("mongoose");

const getUsers = async (req, res) => {
  const users = await User.find().select(["-password", "-__v"]).sort({ createdAt: -1 });
  if (!users?.length) return badRequest(res, "users tidak ditemukan");
  ok(res, "get users", users);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(`id tidak valid`);
  const { username, roles, active, password } = req.body;
  if (!username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean")
    return badRequest(res, "Semua field harus diisi");
  const user = await User.findById(id).exec();
  if (!user) return badRequest(res, "User tidak ditemukan");
  const dup = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (dup && dup?._id.toString() !== id) return conflict(res, "gunakan username lain");
  if (password) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    req.body.password = hash;
  }
  const result = await User.findOneAndUpdate({ username }, req.body, { new: true });
  ok(res, `update ${username} success`, result);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(`id tidak valid`);
  const note = await Note.findOne({ userId: id }).lean().exec();
  if (note) return badRequest(res, "user sudah assign note");
  const user = await User.findById(id).exec();
  if (!user) return badRequest(res, "user tidak ditemukan");
  const data = await User.findByIdAndDelete(id);
  ok(res, `delete ${data.username} success`, data);
};

module.exports = { getUsers, updateUser, deleteUser };
