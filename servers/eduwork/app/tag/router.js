const router = require("express").Router();
const { police_check } = require("../mw");
const { getTags, postTag, updateTag, deleteTag } = require("./controller");

router.get("/", getTags);
router.post("/", police_check("create", "Tag"), postTag);
router.patch("/:id", police_check("update", "Tag"), updateTag);
router.delete("/:id", police_check("delete", "Tag"), deleteTag);

module.exports = router;
