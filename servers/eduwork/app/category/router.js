const router = require("express").Router();
const { police_check } = require("../mw");
const { getCategories, postCategory, updateCategory, deleteCategory } = require("./controller.js");

router.get("/", getCategories);
// router.use(police_check("create"));
// router.post("/", police_check("create", "Category"), postCategory);
router.post("/", postCategory);
// router.put("/:id", police_check("update", "Category"), updateCategory);
router.patch("/:id", updateCategory);
// router.delete("/:id", police_check("delete", "Category"), deleteCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
