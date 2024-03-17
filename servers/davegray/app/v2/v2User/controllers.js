const User = require("./model");
const Note = require("../v2Note/model");
const bcrypt = require("bcrypt");
const { badRequest, ok, conflict } = require("../../utils");

const getUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) return badRequest(res, "users tidak ditemukan");
  ok(res, "get users", users);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, roles, active, password } = req.body;
  if (!username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean")
    return badRequest(res, "Semua field harus diisi");
  const user = await User.findById(id).exec();
  if (!user) return badRequest(res, "User tidak ditemukan");

  const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) return conflict(res, "gunakan username lain");

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return badRequest(res, "id diperlukan");
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) return badRequest(res, "user sudah assign note");
  const user = await User.findById(id).exec();
  if (!user) return badRequest(res, "user tidak ditemukan");
  const data = await user.deleteOne();
  ok(res, `Username ${data.username} dengan id ${data._id} dihapus`, data);
};

module.exports = { getUsers, updateUser, deleteUser };
