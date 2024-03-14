const User = require("./model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "refresh_token"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    await User.update(req.body, { where: { id } });
    res.status(200).json({ message: "Update data berhasil" });
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "Delete data berhasil" });
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
