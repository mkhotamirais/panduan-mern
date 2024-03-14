const { rootPath } = require("../../config/constants");
const { GetUsers, GetUserById, PostUser, DeleteUser, UpdateUser } = require("./controllers");
const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const upload = multer({ dest: path.join(rootPath, "public/images/users") });

router.get("/", GetUsers);
router.get("/:id", GetUserById);
router.post("/", upload.single("image"), PostUser);
router.delete("/:id", DeleteUser);
router.patch("/:id", upload.single("image"), UpdateUser);

module.exports = router;
