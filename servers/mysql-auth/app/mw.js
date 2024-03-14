const jwt = require("jsonwebtoken");
const { ats } = require("../config/constants");
const UserToken = require("./authToken/user/model");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ats, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.id = decoded.id;
    req.name = decoded.name;
    req.role = decoded.role;
    next();
  });
};

const matchUser = async (req, res, next) => {
  const { id } = req.params;
  if (req.role === "admin") return next();
  if (id !== req.id.toString()) return res.sendStatus(403);
  next();
};

const adminOnly = async (req, res, next) => {
  if (req.role !== "admin") return res.status(404).json({ msg: "Hanya admin yang bisa akses" });
  next();
};

module.exports = { verifyToken, matchUser, adminOnly };
