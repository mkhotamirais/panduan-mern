// const { verifyToken } = require("../../middleware/verifyUser");
const { GetAllUsers, Register, Login, Logout, RefreshToken } = require("./controllers");

const router = require("express").Router();

router.get("/", GetAllUsers);
// router.get("/", verifyToken, GetAllUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/refresh", RefreshToken);
router.delete("/logout", Logout);

module.exports = router;
