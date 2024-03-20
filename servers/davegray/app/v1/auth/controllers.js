const { conflict, created, internalServerError, badRequest, unauthorized, forbidden, noContent } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { ats, rts } = require("../../../config/constants");

const data = {
  users: require("../user/user.json"),
  setUsers(data) {
    this.users = data;
  },
};

const signup = (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (!username || !email || !password) return badRequest(res, "isi field yang perlu diisi");
  const dup = data.users.find((u) => u.email === email);
  if (dup) return conflict(res, "email sudah terdaftar");
  if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.id = uuidv4();
    req.body.password = hash;
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
    req.body.roles = { User: 2001 };
    const newUser = req.body;
    data.setUsers([...data.users, newUser]);
    fs.writeFileSync(path.join(__dirname, "../user", "user.json"), JSON.stringify(data.users));
    created(res, `${username} berhasil registrasi`);
  } catch (error) {
    internalServerError(res, error.message);
  }
};

const signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return badRequest(res, "email dan password harus diisi");
  const match = data.users.find((u) => u.email === email);
  if (!match) return unauthorized(res);
  const matchPwd = bcrypt.compareSync(password, match.password);
  if (!matchPwd) return unauthorized(res);
  const roles = Object.values(match.roles);
  const accessToken = jwt.sign({ email: match.email, roles }, ats, { expiresIn: "20s" });
  const refreshToken = jwt.sign({ email: match.email }, rts, { expiresIn: "1d" });
  const otherData = data.users.filter((u) => u.email !== email);
  const currentData = { ...match, refreshToken };
  data.setUsers([...otherData, currentData]);
  fs.writeFileSync(path.join(__dirname, "../user", "user.json"), JSON.stringify(data.users));
  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
  res.json({ accessToken });
};

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return unauthorized(res, "no token");
  const match = data.users.find((u) => u.refreshToken === refreshToken);
  if (!match) return forbidden(res);
  jwt.verify(refreshToken, rts, (err, decoded) => {
    if (err || match.email !== decoded.email) return forbidden(res);
    const roles = Object.values(match.roles);
    const accessToken = jwt.sign({ email: decoded.email, roles }, ats, { expiresIn: "20s" });
    res.json({ accessToken });
  });
};

const signout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return unauthorized(res, "no token");
  const match = data.users.find((u) => u.refreshToken === refreshToken);
  if (!match) {
    res.clearCookie("refreshToken", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
    return noContent(res);
  }
  const otherUsers = data.users.filter((user) => user.refreshToken !== match.refreshToken);
  const currentUser = { ...match, refreshToken: "" };
  data.setUsers([...otherUsers, currentUser]);
  fs.writeFileSync(path.join(__dirname, "../v0user", "user.json"), JSON.stringify(data.users));
  res.clearCookie("refreshToken", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
  return noContent(res);
};

module.exports = { signup, signin, refresh, signout };
