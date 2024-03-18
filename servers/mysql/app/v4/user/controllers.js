const { Op } = require("sequelize");
const { badRequest, ok, created, conflict } = require("../../utils");
const User = require("./model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    ok(res, `get users`, users);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `user id ${id} tidak ditemukan`);
    ok(res, "get user", user);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `user id ${id} tidak ditemukan`);
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    await User.update(req.body, { where: { id } });
    ok(res, `update data berhasil`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return badRequest(res, `user id ${id} tidak ditemukan`);
    await User.destroy({ where: { id } });
    ok(res, "delete data berhasil");
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
