const { ok, badRequest, created } = require("../../utils");
const User = require("./model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    ok(res, `get users`, users);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `User id ${id} tidak ditemukan`);
    ok(res, `get user`, user);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) return badRequest(res, `isi semua field`);
    await User.create(req.body);
    created(res, `post data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `User id ${id} tidak ditemukan`);
    await User.destroy({ where: { id } });
    ok(res, `delete data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `User id ${id} tidak ditemukan`);
    const { name, age } = req.body;
    if (!name || !age) return badRequest(res, `isi semua field`);
    await User.update(req.body, { where: { id } });
    ok(res, `update data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getUser, getUsers, postUser, updateUser, deleteUser };
