const { verifyToken } = require("../../../middleware/verifyAuth");
const { getUsers } = require("./controllers");
const router = require("express").Router();

// router.get("/", verifyToken, getUsers);
router.get("/", getUsers);

module.exports = router;
