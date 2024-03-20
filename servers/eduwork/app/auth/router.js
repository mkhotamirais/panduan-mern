const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { localStrategy, signup, signin, signout, me } = require("./controllers.js");

passport.use(new LocalStrategy({ usernameField: "email" }, localStrategy));

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/me", me);

module.exports = router;
