const { GetProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct } = require("./controllers");

const router = require("express").Router();

router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.post("/", CreateProduct);
router.patch("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;
