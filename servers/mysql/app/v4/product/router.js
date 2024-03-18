const router = require("express").Router();
const { getProduct, getProducts, postProduct, updateProduct, deleteProduct } = require("./controllers");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
