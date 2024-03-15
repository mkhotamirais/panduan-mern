const { Op } = require("sequelize");
const { badRequest, ok, created, conflict } = require("../utils");
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
    ok(res, "get user", user);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postUser = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    const duplicate = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (duplicate) return conflict(res, "username atau email sudah terdaftar");
    if (password) {
      if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    await User.create(req.body);
    created(res, `post ${username} berhasil`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
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
    await User.destroy({ where: { id } });
    ok(res, "delete data berhasil");
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getUsers, getUser, postUser, updateUser, deleteUser };
