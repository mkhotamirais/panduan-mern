const { verifyToken } = require("../../middleware/verifyAuth");
const { getUser, getUsers, updateUser, deleteUser, postUser } = require("./controllers");

const router = require("express").Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
