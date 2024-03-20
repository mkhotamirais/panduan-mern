const loginLimiter = require("../../../middleware/loginLimiter");
const { signup, signin, refresh, signout } = require("./controllers");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", loginLimiter, signin);
router.get("/refresh", refresh);
router.delete("/signout", signout);

module.exports = router;
