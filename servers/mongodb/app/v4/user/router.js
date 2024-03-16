const { getUsers, getSingleUser, updateUser, deleteUser, postUser } = require("./controllers");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", postUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
