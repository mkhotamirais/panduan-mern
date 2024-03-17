const { logout } = require("../../v0/v0Auth/controllers");
const { register, login, refreshToken } = require("./controllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
