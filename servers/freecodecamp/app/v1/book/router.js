const { deleteBook, getBooks, getSingleBook, postBook, updateBook } = require("./controllers");

const router = require("express").Router();

router.get("/", getBooks);
router.get("/:id", getSingleBook);
router.post("/", postBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
