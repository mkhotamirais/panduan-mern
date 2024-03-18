// const { verifyToken } = require("../../middleware/verifyAuth");
const { getUser, getUsers, updateUser, deleteUser } = require("./controllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
