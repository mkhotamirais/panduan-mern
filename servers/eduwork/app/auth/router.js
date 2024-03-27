const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { localStrategy, signup, signin, signout, me } = require("./controllers.js");
const { decodeToken } = require("../mw.js");

passport.use(new LocalStrategy({ usernameField: "email" }, localStrategy));

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/signout", signout);
router.get("/me", decodeToken, me);

module.exports = router;
