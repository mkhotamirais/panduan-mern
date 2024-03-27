const router = require("express").Router();
const { police_check } = require("../mw");

const { getCategories, postCategory, updateCategory, deleteCategory } = require("./controller.js");

router.get("/", getCategories);
router.post("/", police_check("create", "Category"), postCategory);
router.patch("/:id", police_check("update", "Category"), updateCategory);
router.delete("/:id", police_check("delete", "Category"), deleteCategory);

module.exports = router;
