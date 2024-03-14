const bcrypt = require("bcrypt");
const UserToken = require("../user/model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { ats, rts } = require("../../../config/constants");

const Register = async (req, res) => {
  try {
    const { name, email, password, confPassword } = req.body;
    if (!name || !email || !password || !confPassword) return res.status(400).json({ message: "semua field harus diisi" });
    const duplicate = await UserToken.findOne({ where: { [Op.or]: [{ name }, { email }] } });
    if (duplicate) return res.status(409).json({ message: "nama atau email sudah terdaftar" });
    if (password !== confPassword) return res.status(400).json({ message: "konfirmasi password salah" });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    await UserToken.create(req.body);
    res.status(201).json({ message: "register berhasil" });
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "name dan password harus diisi" });
    const user = await UserToken.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User belum terdaftar" });
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });
    const { id, name, email: aliasEmail, role } = user;
    const accessToken = jwt.sign({ id, name, email: aliasEmail, role }, ats, { expiresIn: "15s" });
    const refreshToken = jwt.sign({ id, name, email: aliasEmail, role }, rts, { expiresIn: "1d" });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: "None",
      // secure: false,
    });

    await UserToken.update({ refresh_token: refreshToken }, { where: { id } });
    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) return res.sendStatus(401);
    const user = await UserToken.findOne({ where: { refresh_token } });
    if (!user) return res.sendStatus(403);
    jwt.verify(refresh_token, rts, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const { id, name, email, role } = user;
      const accessToken = jwt.sign({ id, name, email, role }, ats, { expiresIn: "15s" });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const Logout = async (req, res) => {
  const refresh_token = req.cookies.refreshToken;
  if (!refresh_token) return res.sendStatus(204);
  const user = await UserToken.findOne({ where: { refresh_token } });
  if (!user) return res.sendStatus(204);
  await UserToken.update({ refreshToken: null }, { where: { id: user.id } });
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

module.exports = { Login, Register, RefreshToken, Logout };
