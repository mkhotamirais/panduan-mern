const { handleErr } = require("../utils.js");
const User = require("./model.js");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    let count = await User.find().countDocuments();
    let users = await User.find();
    return res.json({ count, data: users });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const match = await User.findById(id);
    if (!match) throw Error("id tidak valid");
    if (password) {
      const salt = genSaltSync(10);
      const hash = hashSync(password, salt);
      const matchPwd = compareSync(password, User?.password);
      if (matchPwd) req.body.password = hash;
    }
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: `update ${result?.fullName} success`, data: result });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await User.findById(id);
    if (!match) throw Error("id tidak valid");
    const result = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `delete ${result?.fullName} success`, data: result });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

module.exports = { getUsers, updateUser, deleteUser };
