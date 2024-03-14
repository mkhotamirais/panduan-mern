const { verifyToken, adminOnly, matchUser } = require("../../mw");
const { GetUsersToken, GetUserTokenById, DeleteUserToken, UpdateUserToken } = require("./controllers");

const router = require("express").Router();

router.get("/", verifyToken, adminOnly, GetUsersToken);
router.get("/:id", verifyToken, matchUser, GetUserTokenById);
router.patch("/:id", verifyToken, matchUser, UpdateUserToken);
router.delete("/:id", verifyToken, matchUser, DeleteUserToken);

module.exports = router;
