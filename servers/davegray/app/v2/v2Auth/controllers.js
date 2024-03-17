const User = require("../v2User/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ats, rts } = require("../../../config/constants");
const { unauthorized, forbidden, noContent, badRequest, ok, created, conflict } = require("../../utils");

const register = async (req, res) => {
  const { username, password, confPassword } = req.body;
  if (!username || !password) return badRequest(res, "semua field harus diisi");
  if (password !== confPassword) return badRequest(res, "konfirmasi password salah");
  const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (duplicate) return conflict(res, "gunakan username lain");
  const hash = await bcrypt.hash(password, 10); // salt rounds
  req.body.password = hash;
  // const userObject =
  //   !Array.isArray(roles) || !roles.length ? { username, password: hash } : { username, password: hash, roles };
  const user = await User.create(req.body);
  created(res, `register ${username} berhasil`, user);
  // if (user) {
  //   created(res, `register ${username} berhasil`);
  // } else {
  //   badRequest(res, "data user salah");
  // }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return badRequest(res, "semua field harus diisi");
  const match = await User.findOne({ username }).exec();
  if (!match || !match.active) return unauthorized(res);
  const matchPwd = await bcrypt.compare(password, match.password);
  if (!matchPwd) return unauthorized(res);

  const accessToken = jwt.sign({ username: match.username, roles: match.roles }, ats, { expiresIn: "10m" });
  const refreshToken = jwt.sign({ username: foundUser.username }, rts, { expiresIn: "7d" });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 3600 * 1000 });
  ok(res, "login berhasil", accessToken);
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return unauthorized(res, "no token");
  jwt.verify(refreshToken, rts, async (err, decoded) => {
    if (err) return forbidden(res);
    const match = await User.findOne({ username: decoded.username }).exec();
    if (!match) return unauthorized(res, "no token");
    const accessToken = jwt.sign({ username: match.username, roles: match.roles }, ats, { expiresIn: "10m" });
    ok(res, "refresh token", accessToken);
  });
};

const logout = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return noContent(res, "logout berhasil");
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = { register, login, refreshToken, logout };

// const Users = require("./model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User } = require("../../config/rolesList");
// const { rts, ats } = require("../../config/constants");
// const { response } = require("express");
// const { badRequest, conflict, created, unauthorized } = require("../../utils");

// const BadRequest_Required = (res) => res.status(400).json({ message: "Username and password are required" });
// const StatusLogin = (status) => (status == "no token" ? "you are not logged in" : "username or password wrong");
// const Unauthorized = (res, status) => res.status(401).json({ message: StatusLogin(status) });
// const Conflict = (res) => res.sendStatus(409);
// const Created = (res, message) => res.status(201).json({ message });
// const InternalServerError = (res, message) => res.status(500).json({ message });

// const GetAllUsers = async (req, res) => {
//   const users = await Users.find({}).select("-password -__v");
//   res.json(users);
// };

// const Register = async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) return BadRequest_Required(res);
//   const duplicate = await Users.findOne({ username });
//   if (duplicate) return Conflict(res);
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hashPwd = bcrypt.hashSync(password, salt);
//     const result = await Users.create({ username, password: hashPwd });
//     res.status(201).json({ msg: `New user ${username} is created` });
//   } catch (error) {
//     InternalServerError(res, error.message);
//   }
// };

// const Login = async (req, res) => {
//   const token = req.cookies;
//   const { username, password } = req.body;
//   if (!username || !password) return BadRequest_Required(res);
//   let matchUser = await Users.findOne({ username });
//   if (!matchUser) return Unauthorized(res);
//   const matchPwd = bcrypt.compareSync(password, matchUser.password);
//   if (matchPwd) {
//     const roles = Object.values(matchUser.roles);
//     const accessToken = jwt.sign({ username: matchUser.username, roles }, ats, { expiresIn: "30s" });
//     const newRefreshToken = jwt.sign({ username: matchUser.username }, rts, { expiresIn: "1d" });
//     const newRefreshTokenArray = !token?.jwt
//       ? matchUser.refreshToken
//       : matchUser.refreshToken.filter((rt) => rt !== token.jwt);
//     if (token?.jwt) res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
//     matchUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//     await matchUser.save();
//     res.cookie("jwt", newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
//     res.json({ accessToken, roles });
//   } else {
//     res.sendStatus(401);
//   }
// };

// const RefreshToken = async (req, res) => {
//   const token = req.cookies;
//   if (!token?.jwt) return res.sendStatus(401);
//   const refreshToken = token.jwt;
//   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });

//   const matchUser = await Users.findOne({ refreshToken });
//   // Detected refresh token reuse
//   if (!matchUser) {
//     jwt.verify(refreshToken, rts, async (err, decoded) => {
//       if (err) return res.sendStatus(403);
//       const hackedUser = await Users.findOne({ username: decoded.username }).exec();
//       hackedUser.refreshToken = [];
//       await hackedUser.save();
//     });
//     return res.sendStatus(403);
//   }
//   const newRefreshTokenArray = matchUser.refreshToken.filter((rt) => rt !== refreshToken);

//   jwt.verify(req.cookies.jwt, rts, async (err, decoded) => {
//     if (err) {
//       matchUser.refreshToken = [...newRefreshTokenArray];
//       await matchUser.save();
//     }
//     if (err || matchUser.username !== decoded.username) return res.sendStatus(403);
//     const roles = Object.values(matchUser.roles);
//     const accessToken = jwt.sign({ username: matchUser.username, roles }, ats, { expiresIn: "30s" });
//     const newRefreshToken = jwt.sign({ username: matchUser.username }, rts, { expiresIn: "1d" });
//     matchUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//     await matchUser.save();
//     res.cookie("jwt", newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
//     res.json({ accessToken, roles });
//   });
// };

// const ClearCookie = (res) => {
//   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
//   return res.sendStatus(204);
// };

// const Logout = async (req, res) => {
//   const token = req.cookies;
//   if (!token?.jwt) return res.sendStatus(401);
//   const refreshToken = token.jwt;
//   const matchUser = await Users.findOne({ refreshToken });
//   if (!matchUser) ClearCookie(res);
//   matchUser.refreshToken = matchUser.refreshToken.filter((rt) => rt !== refreshToken);
//   await matchUser.save();
//   ClearCookie(res);
// };

// module.exports = { GetAllUsers, Register, Login, RefreshToken, Logout };
