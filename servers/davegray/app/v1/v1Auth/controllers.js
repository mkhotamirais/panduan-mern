const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ats, rts } = require("../../../config/constants");
const User = require("../v1User/model");
const { ok, unauthorized, forbidden, badRequest, created, internalServerError } = require("../../utils");
const { resolve6 } = require("dns/promises");

const register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (!username || !email || !password || !confPassword) return badRequest(res, "semua field perlu diisi");
  // const duplicate = await User.findOne({ username });
  // if (duplicate) return Conflict(res, "data sudah terdaftar");
  if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const data = await User.create({ username, email, password: hash, roles: { User: 2001 } });
    created(res, `registrasi ${username} berhasil`, data);
  } catch (error) {
    internalServerError(res, error.message);
  }
};

const login = async (req, res) => {
  const cookies = req.cookies;
  const { username, password } = req.body;
  if (!username || !password) return badRequest(res, "username dan password harus diisi");
  const match = await User.findOne({ username });
  if (!match) return unauthorized(res);
  const matchPwd = bcrypt.compareSync(password, match.password);
  if (!matchPwd) return unauthorized(res);
  const roles = Object.values(match.roles);
  const accessToken = jwt.sign({ username: match.username, roles }, ats, { expiresIn: "20s" });
  const refreshToken = jwt.sign({ username: match.username }, rts, { expiresIn: "1d" });

  let newRefreshTokenArray;
  if (!cookies.refreshToken) newRefreshTokenArray = match.refreshToken;
  if (cookies.refreshToken) {
    newRefreshTokenArray = match.refreshToken.filter((rt) => rt !== token.refreshToken);
    res.clearCookie("refreshToken", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
  }
  match.refreshToken = [...newRefreshTokenArray, refreshToken];
  await match.save();
  // const data = await User.findOneAndUpdate({name: match.name}, {refreshToken: match.refreshToken}, {new: true, upsert: true})
  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
  ok(res, "login success", { accessToken, roles });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return unauthorized(res, "no token");
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
  const match = await User.findOne({ refreshToken });
  // Detected refresh token reuse
  if (!match) {
    jwt.verify(refreshToken, rts, async (err, decoded) => {
      if (err) return forbidden(res);
      const hackedUser = await User.findOne({ username: decoded.username }).exec();
      hackedUser.refreshToken = [];
      await hackedUser.save();
    });
    return forbidden(res);
  }
  const newRefreshTokenArray = match.refreshToken.filter((rt) => rt !== refreshToken);

  jwt.verify(refreshToken, rts, async (err, decoded) => {
    if (err) {
      match.refreshToken = [...newRefreshTokenArray];
      await match.save();
    }
    if (err || match.username !== decoded.username) return forbidden(res);
    const roles = Object.values(match.roles);
    const accessToken = jwt.sign({ username: match.username, roles }, ats, { expiresIn: "30s" });
    const newRefreshToken = jwt.sign({ username: match.username }, rts, { expiresIn: "1d" });
    match.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await match.save();
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    ok(res, "refresh token berhasil", { accessToken, roles });
  });
};

const clearCookie = (res) => {
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

const Logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return unauthorized(res, "no token");
  const match = await User.findOne({ refreshToken });
  if (!match) clearCookie(res);
  match.refreshToken = match.refreshToken.filter((rt) => rt !== refreshToken);
  await match.save();
  clearCookie(res);
};

module.exports = { register, login, refreshToken, Logout };
