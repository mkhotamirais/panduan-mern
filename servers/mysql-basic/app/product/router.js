const { GetProducts, GetProductById, PostProduct, UpdateProduct, DeleteProduct } = require("./controllers");

const router = require("express").Router();

router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.post("/", PostProduct);
router.patch("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;