const { login, register, refreshToken, logout } = require("./controllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refreshToken", refreshToken);
router.delete("/logout", logout);

module.exports = router;
