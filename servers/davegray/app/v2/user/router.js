const { verifyToken } = require("../../../middleware/verifyAuth");
const { getUsers, updateUser, deleteUser } = require("./controllers");

const router = require("express").Router();

// router.use(verifyToken);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
