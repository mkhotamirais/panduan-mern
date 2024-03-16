const { badRequest, conflict, created, ok, unauthorized, forbidden, noContent } = require("../../utils");
const jwt = require("jsonwebtoken");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const { ats, rts } = require("../../../config/constants");

const register = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    const dup = await User.findOne({ username });
    if (dup) return conflict(res, `Username sudah terdafter, gunakan username lain`);
    if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    const data = await User.create(req.body);
    created(res, `register ${data.username} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return badRequest(res, `Username dan password harus diisi`);
    const match = await User.findOne({ username });
    if (!match) return badRequest(res, `Username atau password tidak sesuaii`);
    const matchPwd = bcrypt.compareSync(password, match.password);
    if (!matchPwd) return badRequest(res, `Username atau password tidak sesuai`);
    const { id, username: u, role } = match;
    const accessToken = jwt.sign({ id, username: u, role }, ats, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ id, username: u, role }, rts, { expiresIn: "1d" });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
      // sameSite: "None",
      // secure: false,
    });
    await User.findOneAndUpdate({ username }, { refreshToken });
    ok(res, `Selamat datang ${match.username}`, accessToken);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return unauthorized(res, "no token");
    jwt.verify(refreshToken, rts, async (err, decoded) => {
      if (err) return forbidden(res);
      const match = await User.findOne({ username: decoded.username });
      if (!match) return unauthorized(res);
      const { id, username, role } = decoded;
      const accessToken = jwt.sign({ id, username, role }, ats, { expiresIn: "20s" });
      ok(res, "access token", accessToken);
    });
  } catch (error) {
    badRequest(res, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return noContent(res);
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true });
    ok(res, "Logout berhasil");
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { login, register, refreshToken, logout };
