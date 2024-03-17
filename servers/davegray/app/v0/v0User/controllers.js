const fs = require("fs");
const path = require("path");
const { ok } = require("../../utils");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const data = {
  users: require("./user.json"),
  setUsers(data) {
    this.users = data;
  },
};

const getUsers = async (req, res) => {
  const result = data.users.map((user) => ({ username: user.username, roles: user.roles, refreshToken: user.refreshToken }));
  ok(res, "get users", result);
};

module.exports = { getUsers };

// const RefreshToken = (req, res) => {
//   const token = req.cookies;
//   if (!token?.jwt) return Unauthorized(res, "no token");
//   const match = data.users.find((user) => user.refreshToken === token.jwt);
//   if (!match) return res.sendStatus(403);
//   jwt.verify(token.jwt, rts, (err, decoded) => {
//     if (err || match.username !== decoded.username) return res.sendStatus(403);
//     const roles = Object.values(match.roles);
//     const accessToken = jwt.sign({ username: decoded.username, roles }, ats, { expiresIn: "30s" });
//     res.json({ accessToken });
//   });
// };

// const ClearCookie = (res) => {
//   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "None", secure: true });
//   return res.status(204).json({ msg: "no content" });
// };

// const Logout = (req, res) => {
//   const token = req.cookies;
//   if (!token?.jwt) return Unauthorized(res, "no token");
//   const match = data.users.find((user) => user.refreshToken === token.jwt);
//   if (!match) ClearCookie(res);
//   const otherUsers = data.users.filter((user) => user.refreshToken !== match.refreshToken);
//   const currentUser = { ...match, refreshToken: "" };
//   data.setUsers([...otherUsers, currentUser]);
//   fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(data.users));
//   ClearCookie(res);
// };

// module.exports = { GetAllUsers, Register, Login, RefreshToken, Logout };
