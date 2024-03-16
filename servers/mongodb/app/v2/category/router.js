const router = require("express").Router();
const { getCategories, postCategory, getSingleCategory, updateCategory, deleteCategory } = require("./controllers");

router.get("/", getCategories);
router.get("/:id", getSingleCategory);
router.post("/", postCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
