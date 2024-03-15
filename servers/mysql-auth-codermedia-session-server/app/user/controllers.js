const User = require("./model");
const argon2 = require("argon2");

// users
const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["uuid", "name", "email", "role"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const GetUserById = async (req, res) => {
  const { id: uuid } = req.params;
  try {
    const response = await User.findOne({ where: { uuid }, attributes: ["uuid", "name", "email", "role"] });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: req.params.id } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ message: "Password dan confirm password tidak cocok" });
  const hash = password === "" || password === null ? user.password : await argon2.hash(password);
  req.body.password = hash;
  try {
    await User.update(req.body, { where: { id: user.id } });
    res.status(200).json({ message: "Update user berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const DeleteUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: req.params.id } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  try {
    await User.destroy({ where: { id: user.id } });
    res.status(200).json({ message: "Hapus user berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { GetUsers, GetUserById, DeleteUser, UpdateUser };
