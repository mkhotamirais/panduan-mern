const { badRequest, ok } = require("../../utils");
const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const data = await User.find().select(["-password", "-__v"]);
    ok(res, `get users`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    ok(res, `get single user`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postUser = async (req, res) => {
  try {
    console.log(req.body);
    const { password, confPassword } = req.body;
    if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    const data = await User.create(req.body);
    ok(res, `post user ${req.body.username} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    ok(res, `delete user ${data.username} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    const { password, confPassword } = req.body;
    if (password) {
      if (password !== confPassword) badRequest(res, "konfirmasi password salah");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, `update user ${req.body.username} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getUsers, getSingleUser, postUser, deleteUser, updateUser };
