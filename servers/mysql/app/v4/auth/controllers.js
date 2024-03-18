const bcrypt = require("bcrypt");
const User = require("../user/model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { ats, rts } = require("../../../config/constants");
const { badRequest, conflict, created, ok, unauthorized, forbidden, noContent } = require("../../utils");

const signup = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username || !email || !password || !confPassword) return badRequest(res, "semua field harus diisi");
    const duplicate = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (duplicate) return conflict(res, "username atau email sudah terdaftar");
    if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    await User.create(req.body);
    created(res, `register ${username} berhasil`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, "email dan password harus diisi");
    const user = await User.findOne({ where: { email } });
    if (!user) return badRequest(res, "user belum terdaftar");
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return badRequest(res, "password salah");
    const { id, email: aliasEmail, role } = user;
    const accessToken = jwt.sign({ id, email: aliasEmail, role }, ats, { expiresIn: "15s" });
    const refreshToken = jwt.sign({ id, email: aliasEmail, role }, rts, { expiresIn: "1d" });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: "None",
      // secure: false,
    });
    await User.update({ refresh_token: refreshToken }, { where: { id } });
    ok(res, `login success`, accessToken);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const refresh = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) return unauthorized(res, "no token");
    const user = await User.findOne({ where: { refresh_token } });
    if (!user) return forbidden(res);
    jwt.verify(refresh_token, rts, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const { id, email, role } = user;
      const accessToken = jwt.sign({ id, email, role }, ats, { expiresIn: "15s" });
      ok(res, "refresh", accessToken);
    });
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const signout = async (req, res) => {
  const refresh_token = req?.cookies?.refreshToken;
  if (!refresh_token) return noContent(res);
  const user = await User.findOne({ where: { refresh_token } });
  if (!user) return noContent(res);
  await User.update({ refreshToken: null }, { where: { id: user.id } });
  res.clearCookie("refreshToken");
  ok(res, `signout berhasil`);
};

module.exports = { signin, signout, refresh, signup };
