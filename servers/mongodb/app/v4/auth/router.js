const { login, register, refreshToken, logout } = require("./controllers");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refreshToken", refreshToken);
router.delete("/logout", logout);

module.exports = router;
