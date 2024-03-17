const Users = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { atk } = require("../../config/constants");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const duplicate = await Users.findOne({ email });
    if (duplicate) return res.status(409).json({ message: "email sudah terdaftar" });

    const hash = bcrypt.hashSync(password, 10);
    req.body.password = hash;

    const newUser = await Users.create(req.body);
    res.status(201).json({ message: `${newUser.name} berhasil signup` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userExist = await Users.findOne({ email });
    if (!userExist) return res.status(400).json({ message: "Email belum terdaftar" });

    const comparePass = bcrypt.compareSync(password, userExist.password);
    if (!comparePass) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: userExist._id }, atk, { expiresIn: "30s" });

    res.cookie(String(userExist._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "berhasil login", userExist, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Me = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Users.findById(userId, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { Signup, Login, Me };
