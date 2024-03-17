const { me, signin, signout, signup } = require("./controllers");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", me);
router.delete("/signout", signout);

module.exports = router;
