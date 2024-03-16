const { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct } = require("./controllers");

const router = require("express").Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
