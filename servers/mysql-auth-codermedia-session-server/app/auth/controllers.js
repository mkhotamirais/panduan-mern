const User = require("../user/model");
const argon2 = require("argon2");

// auth
const Login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Password salah" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

const Me = async (req, res) => {
  const { userId: uuid } = req.session;
  if (!uuid) return res.status(401).json({ message: "Mohon login ke akun anda" });
  const user = await User.findOne({ attributes: ["uuid", "name", "email", "role"], where: { uuid } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.status(200).json(user);
};

const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "tidak dapat logout" });
    res.status(200).json({ message: "Anda telah logout" });
  });
};

const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  // const users = await User.findAll();
  // const emails = users.map((user) => user.email);
  // if (emails.indexOf(email) > -1) return res.status(409).json({ message: "email sudah terdaftar" });
  if (password !== confPassword) return res.status(400).json({ message: "Password dan confirm password tidak cocok" });
  req.body.password = await argon2.hash(password);
  try {
    await User.create(req.body);
    res.status(201).json({ message: "Register berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { Login, Me, Register, Logout };
