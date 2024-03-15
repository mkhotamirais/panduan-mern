const User = require("./user/model");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const { userId: uuid } = req.session;
  if (!uuid) return res.status(401).json({ msg: "Mohon login ke akun anda" });
  const user = await User.findOne({ where: { uuid } });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

const adminOnly = async (req, res, next) => {
  const user = await User.findOne({ where: { uuid: req.session.userId } });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang, admin only" });
  next();
};

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(token);
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     req.email = decoded.email;
//     next();
//   });
// };

module.exports = { verifyUser, adminOnly };
