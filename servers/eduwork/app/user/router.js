const router = require("express").Router();
const passport = require("passport");
const { localStrategy } = require("../auth/controllers.js");
const { police_check } = require("../mw.js");
const { getUsers } = require("./controllers.js");

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy({ usernameField: "email" }, localStrategy));

router.get("/", police_check("view", "Users"), getUsers);

module.exports = router;
