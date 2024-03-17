const jwt = require("jsonwebtoken");
const { ats } = require("../config/constants");
const { unauthorized, forbidden } = require("../app/utils");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return unauthorized(res, "no token");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ats, (err, decoded) => {
    if (err) return forbidden(res);
    req.user = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

// const verifyRoles = (...allowedRoles) => {
//   const verifyRoles = (req, res, next) => {
//     if (!req?.roles) return res.sendStatus(401);
//     const result = req.roles.map((role) => allowedRoles.includes(role)).find((val) => val === true);
//     if (!result) return res.sendStatus(401);
//     next();
//   };
//   return verifyRoles
// };

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return unauthorized(res, "no token");
    const result = req.roles.map((role) => allowedRoles.includes(role)).find((val) => val === true);
    if (!result) return unauthorized(res, "no token");
    next();
  };
};

module.exports = { verifyToken, verifyRoles };
