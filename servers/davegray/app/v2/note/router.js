const router = require("express").Router();
const { verifyToken } = require("../../../middleware/verifyAuth");
const { getNotes, postNote, updateNote, deleteNote } = require("./controllers");

// router.use(verifyToken);
router.get("/", getNotes);
router.post("/", postNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
