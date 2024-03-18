const { signin, signup, refresh, signout } = require("./controllers");

const router = require("express").Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/refresh", refresh);
router.delete("/signout", signout);

module.exports = router;
