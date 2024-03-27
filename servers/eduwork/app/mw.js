const { policyfor } = require("./utils.js");
const jwt = require("jsonwebtoken");
const User = require("./user/model.js");
const { secretKey } = require("../config/constants.js");

const decodeToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return next();
    const token = authHeader.split(" ")[1];
    if (!token) return next();
    req.user = jwt.verify(token, secretKey);
    let user = await User.findOne({ token: { $in: [token] } });
    if (!user) return res.json({ error: 1, message: "Token Expired" });
  } catch (err) {
    if (err && err.name === "JsonWebTokenError") return res.json({ error: 1, message: err.message });
    next(err);
  }
  next();
};

function police_check(action, subject) {
  return function (req, res, next) {
    let policy = policyfor(req.user);
    if (!policy.can(action, subject)) return res.json({ error: 1, message: `You are not allowed to ${action} ${subject}` });
    next();
  };
}

module.exports = { decodeToken, police_check };
