const { Login, Register, RefreshToken, Logout } = require("./controllers");

const router = require("express").Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/refreshtoken", RefreshToken);
router.delete("/logout", Logout);

module.exports = router;
