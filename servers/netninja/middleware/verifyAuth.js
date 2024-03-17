const { unauthorized } = require("../app/utils");
const { at } = require("../config/constants");
const jwt = require("jsonwebtoken");
const User = require("../app/v1/user/model");

const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return unauthorized(res, "no token");
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, at);
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    unauthorized(res);
  }
};

module.exports = { verifyAuth };
