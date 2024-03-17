const jwt = require("jsonwebtoken");
const { atk } = require("../config/constants");

const VerifyToken = (req, res, next) => {
  // const headers = req.headers["authorization"];
  // const token = headers.split(" ")[1];

  const cookies = req.headers.cookie;
  const token = cookies && cookies.split("=")[1];

  if (!token) return res.status(404).json({ message: "token tidak ditemukan" });

  jwt.verify(String(token), atk, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.userId = user.id;
    next();
  });
};

module.exports = { VerifyToken };
