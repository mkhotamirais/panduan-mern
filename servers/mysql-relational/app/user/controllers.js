const User = require("./model");

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const PostUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) res.statu(400).json({ message: `Isi semua field` });
    await User.create(req.body);
    res.status(200).json({ message: "Berhasil menambah user" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "Berhasil menghapus user" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });
    const { name, age } = req.body;
    if (!name || !age) res.statu(400).json({ message: `Isi semua field` });
    await User.update(req.body, { where: { id } });
    res.status(200).json({ message: "Berhasil mengubah user" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { GetUsers, GetUserById, PostUser, UpdateUser, DeleteUser };
