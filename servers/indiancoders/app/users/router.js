const router = require("express").Router();
const { VerifyToken } = require("../mw");
const { Signup, Login, Me } = require("./controllers");

router.post("/signup", Signup);
router.get("/login", Login);
router.get("/me", VerifyToken, Me);

module.exports = router;
