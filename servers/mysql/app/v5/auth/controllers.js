const { badRequest, conflict, created, ok, unauthorized } = require("../../utils");
const User = require("../user/model");
const argon2 = require("argon2");

const signup = async (req, res) => {
  const { email, password, confPassword } = req.body;
  const dup = await User.findOne({ where: { email } });
  if (dup) return conflict(res, `email sudah terdaftar`);
  if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
  req.body.password = await argon2.hash(password);
  try {
    await User.create(req.body);
    created(res, `signup success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return badRequest(res, `${email} tidak ditemukan`);
    const match = await argon2.verify(user.password, password);
    if (!match) return badRequest(res, `password salah`);
    req.session.userId = user.uuid;
    ok(res, `signin success`, { uuid: user.uuid, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const me = async (req, res) => {
  const { userId: uuid } = req.session;
  if (!uuid) return unauthorized(res, "no token");
  const user = await User.findOne({ where: { uuid }, attributes: ["uuid", "name", "email", "role"] });
  if (!user) return badRequest(res, `user tidak ditemukan`);
  ok(res, `me`, user);
};

const signout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return badRequest(res, `tidak datap signout`);
    ok(res, `signout berhasil`);
  });
};

module.exports = { signin, me, signup, signout };
