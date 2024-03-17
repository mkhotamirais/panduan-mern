const { getProducts, getProduct, postProduct, updateProduct, deleteProduct } = require("./controllers");

const router = require("express").Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
