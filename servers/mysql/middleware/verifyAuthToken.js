const jwt = require("jsonwebtoken");
const { ats } = require("../config/constants");
const { forbidden, unauthorized } = require("../app/utils");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return unauthorized(res, "no token");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ats, (err, decoded) => {
    if (err) return forbidden(res, `token tidak valid`);
    req.id = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  });
};

const matchUser = async (req, res, next) => {
  const { id } = req.params;
  if (req.role === "admin") return next();
  if (id !== req.id.toString()) return forbidden(res, `token tidak valid`);
  next();
};

const adminOnlyV4 = async (req, res, next) => {
  if (req.role !== "admin") return forbidden(res, `admin only`);
  next();
};

module.exports = { verifyToken, matchUser, adminOnlyV4 };
