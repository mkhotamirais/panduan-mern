const { conflict, created, internalServerError, badRequest, unauthorized, forbidden, noContent } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { ats, rts } = require("../../../config/constants");

const data = {
  users: require("../v0User/user.json"),
  setUsers(data) {
    this.users = data;
  },
};

const register = (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (!username || !password) return badRequest(res, "username dan password harus diisi");
  const duplicate = data.users.find((u) => u.username === username);
  if (duplicate) return conflict(res, "data sudah terdaftar");
  if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = { username, email, password: hash, roles: { User: 2001 } };
    data.setUsers([...data.users, newUser]);
    fs.writeFileSync(path.join(__dirname, "../v0user", "user.json"), JSON.stringify(data.users));
    created(res, `${username} berhasil registrasi`, newUser);
  } catch (error) {
    internalServerError(res, error.message);
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return badRequest(res, "username dan password harus diisi");
  const match = data.users.find((u) => u.username === username);
  if (!match) return unauthorized(res);
  const matchPwd = bcrypt.compareSync(password, match.password);
  if (!matchPwd) return unauthorized(res);
  const roles = Object.values(match.roles);
  const accessToken = jwt.sign({ username: match.username, roles }, ats, { expiresIn: "20s" });
  const refreshToken = jwt.sign({ username: match.username }, rts, { expiresIn: "1d" });
  const otherData = data.users.filter((u) => u.username !== username);
  const currentData = { ...match, refreshToken };
  console.log(currentData);
  data.setUsers([...otherData, currentData]);
  fs.writeFileSync(path.join(__dirname, "../v0user", "user.json"), JSON.stringify(data.users));
  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
  res.json({ accessToken });
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return unauthorized(res, "no token");
  const match = data.users.find((u) => u.refreshToken === refreshToken);
  if (!match) return forbidden(res);
  jwt.verify(refreshToken, rts, (err, decoded) => {
    if (err || match.username !== decoded.username) return forbidden(res);
    const roles = Object.values(match.roles);
    const accessToken = jwt.sign({ username: decoded.username, roles }, ats, { expiresIn: "20s" });
    res.json({ accessToken });
  });
};

const logout = (req, res) => {
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

module.exports = { register, login, refreshToken, logout };
