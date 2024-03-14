const { GetUsers, GetUserById, PostUser, UpdateUser, DeleteUser } = require("./controllers");

const router = require("express").Router();

router.get("/", GetUsers);
router.get("/:id", GetUserById);
router.post("/", PostUser);
router.patch("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

module.exports = router;
