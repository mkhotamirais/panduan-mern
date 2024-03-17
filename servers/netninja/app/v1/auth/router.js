const { signin, signup } = require("./controllers");

const router = require("express").Router();

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
