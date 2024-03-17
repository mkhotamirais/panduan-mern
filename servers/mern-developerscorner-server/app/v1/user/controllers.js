const { genSaltSync, hashSync } = require("bcrypt");
const { badRequest, ok } = require("../../utils");
const User = require("./model");

const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    ok(res, `get users`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, `get single user`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, `delete user id ${id} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password, confPassword } = req.body;
    if (!name || !email || !mobile) return badRequest(res, `isi semua field yang harus diisi`);
    const dup = await User.findOne({ email });
    if (dup && email !== dup.email) return badRequest(res, `user dengan email ${email} sudah terdaftar, gunakan email lain`);
    if (password) {
      if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
      const salt = genSaltSync(10);
      const hash = hashSync(req.body.password, salt);
      req.body.password = hash;
    }
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, `update user id ${id} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getUsers, getSingleUser, deleteUser, updateUser };
