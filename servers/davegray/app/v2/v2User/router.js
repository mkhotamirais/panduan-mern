const { getUsers } = require("./controllers");

const router = require("express").Router();

router.get("/", getUsers);
router.post("/");

module.exports = router;
