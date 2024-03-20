const User = require("../user/model");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ats, rts } = require("../../../config/constants");
const { unauthorized, forbidden, noContent, badRequest, ok, created, conflict } = require("../../utils");

const signup = async (req, res) => {
  const { username, password, confPassword } = req.body;
  if (!username || !password) return badRequest(res, "semua field harus diisi");
  if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
  const dup = await User.findOne({ username }).collation({ locale: "en", strength: 2 });
  if (dup) return conflict(res, "gunakan username lain");
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  req.body.password = hash;
  const user = await User.create(req.body);
  await user.save();
  created(res, `register ${username} berhasil`, user);
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return badRequest(res, "semua field harus diisi");
  const match = await User.findOne({ username }).exec();
  if (!match || !match.active) return unauthorized(res);
  const matchPwd = compareSync(password, match.password);
  if (!matchPwd) return unauthorized(res);

  const accessToken = jwt.sign({ username: match.username, roles: match.roles }, ats, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ username: match.username }, rts, { expiresIn: "7d" });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: "auto",
    sameSite: "None",
    maxAge: 7 * 24 * 3600 * 1000,
  });
  ok(res, "signin success", accessToken);
};

const refresh = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return unauthorized(res, "no token");
  jwt.verify(refreshToken, rts, async (err, decoded) => {
    if (err) return forbidden(res);
    const match = await User.findOne({ username: decoded.username }).exec();
    if (!match) return unauthorized(res, "no token");
    const accessToken = jwt.sign({ username: match.username, roles: match.roles }, ats, { expiresIn: "10m" });
    ok(res, "access token", accessToken);
  });
};

const signout = (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);
  if (!refreshToken) return noContent(res, "logout berhasil");
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: "auto" });
  res.json({ message: "Cookie cleared" });
};

module.exports = { signup, signin, refresh, signout };
