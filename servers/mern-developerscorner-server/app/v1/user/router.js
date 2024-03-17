const { verifyToken, verifyAdmin } = require("../../../middleware/verifyAuth");
const { getUsers, getSingleUser, deleteUser, updateUser } = require("./controllers");

const router = require("express").Router();

router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
