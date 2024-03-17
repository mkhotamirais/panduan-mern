const { unauthorized, badRequest, forbidden } = require("../app/utils");
const User = require("../app/v5/user/model");

const verifyUserSess = async (req, res, next) => {
  const { userId: uuid } = req.session;
  if (!uuid) return unauthorized(res, "no token");
  const user = await User.findOne({ where: { uuid } });
  if (!user) return badRequest(res, `user tidak ditemukan`);
  req.userId = user.id;
  req.role = user.role;
  next();
};

const adminOnlySess = async (req, res, next) => {
  const user = await User.findOne({ where: { uuid: req.session.userId } });
  if (!user) return badRequest(res, `user tidak ditemukan`);
  if (user.role !== "admin") return forbidden(res);
  next();
};

module.exports = { verifyUserSess, adminOnlySess };
