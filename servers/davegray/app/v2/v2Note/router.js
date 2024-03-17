const router = require("express").Router();
const { getNotes, postNote, updateNote, deleteNote } = require("./controllers");

router.get("/", getNotes);
router.post("/", postNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
