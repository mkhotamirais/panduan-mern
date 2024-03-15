const { Me, Login, Logout, Register } = require("./controllers");

const router = require("express").Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/", Register);

module.exports = router;
