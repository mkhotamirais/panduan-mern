const User = require("./model.js");

const getUsers = async (req, res, next) => {
  try {
    let count = await User.find().countDocuments();
    let users = await User.find();
    return res.json({ count, users });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

module.exports = { getUsers };
