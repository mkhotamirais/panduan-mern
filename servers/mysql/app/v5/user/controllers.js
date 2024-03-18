const { badRequest, ok, created } = require("../../utils");
const User = require("./model");
const argon2 = require("argon2");

// users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      // attributes: ["uuid", "name", "email", "role"],
      attributes: { exclude: ["password"] },
    });
    ok(res, `get users`, users);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};
const getUser = async (req, res) => {
  const { id: uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid }, attributes: ["uuid", "name", "email", "role"] });
    ok(res, `get user`, user);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateUser = async (req, res) => {
  const { id: uuid } = req.params;
  const user = await User.findOne({ where: { uuid } });
  if (!user) return badRequest(res, `user id ${uuid} tidak ditemukan`);
  const { password, confPassword } = req.body;
  if (password) {
    if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
    const hash = password === "" || password === null ? user.password : await argon2.hash(password);
    req.body.password = hash;
  }
  try {
    await User.update(req.body, { where: { id: user.id } });
    res.status(200).json({ message: `Update ${user?.name} success` });
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id: uuid } = req.params;
  const user = await User.findOne({ where: { uuid } });
  if (!user) return badRequest(res, `user id ${uuid} tidak ditemukan`);
  try {
    await User.destroy({ where: { id: user.id } });
    ok(res, `delete ${user?.name} success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
