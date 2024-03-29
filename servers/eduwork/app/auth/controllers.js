const User = require("../user/model.js");
const { getToken, handleErr } = require("../utils.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/constants.js");

const signup = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json({ message: "Register success", data: user });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(["-__v", "-updatedAt", "-cart_items", "-token"]);
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      let { password, ...userWithoutPassword } = user.toJSON();
      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }
  done();
};

const signin = (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: 1, message: "Email or password incorrect" });
    let signed = jwt.sign(user, secretKey);
    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
    res.status(200).json({ user, signed });
  })(req, res, next);
};

const signout = async (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null;
  console.log(token);
  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token: token } },
    { useFindAndModify: false }
  );
  if (!token || !user) return res.status(400).json({ error: 1, message: "No User Found" });
  return res.json({ error: 0, message: "Logout berhasil" });
};

const me = (req, res, next) => {
  const { password, ...otherData } = req.user;
  if (!req.user) {
    res.json({ err: 1, message: "You are not login or token expired" });
  }
  res.json(otherData);
};

module.exports = { signup, localStrategy, signin, signout, me };
