const { at } = require("../../../config/constants");
const { created, badRequest, ok } = require("../../utils");
const User = require("../user/model");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signin(email, password);
    const token = jwt.sign({ _id: user._id }, at, { expiresIn: "3d" });
    res.status(200).json({ message: "signin success", user, token });
  } catch (error) {
    badRequest(res, error?.message);
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = jwt.sign({ _id: user._id }, at, { expiresIn: "3d" });
    res.status(201).json({ message: "signup success", user, token });
  } catch (error) {
    badRequest(res, error?.message);
  }
};

module.exports = { signin, signup };
