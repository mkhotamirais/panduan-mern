const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { badRequest, created, ok } = require("../../utils");
const User = require("../user/model");
const jwt = require("jsonwebtoken");
const { ats } = require("../../../config/constants");

const signup = async (req, res) => {
  try {
    const { name, email, mobile, password, confPassword } = req.body;
    if ((!name || !email || !mobile, !password || !confPassword)) return badRequest(res, `isi semua field yang perlu diisi`);
    const dup = await User.findOne({ email });
    if (dup) return badRequest(res, `email sudah terdaftar, gunakan email lain`);
    if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    req.body.password = hash;
    const result = await User.create(req.body);
    created(res, `register ${result.email} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, `username dan password harus diisi`);
    const match = await User.findOne({ email });
    if (!match) return badRequest(res, `username atau password salah`);
    const matchPwd = compareSync(password, match.password);
    if (!matchPwd) return badRequest(res, `username atau password salah`);
    const accessToken = jwt.sign({ id: match._id, name: match.name, role: match.role }, ats, { expiresIn: "1d" });
    const result = await User.findOneAndUpdate({ email }, { accessToken }, { new: true }).select(["-__v", "-password"]);
    ok(res, `login ${result.email} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { signup, signin };
