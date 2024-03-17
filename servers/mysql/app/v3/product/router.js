const { rootPath } = require("../../../config/constants");
const { getProduct, getProducts, postProduct, deleteProduct, updateProduct } = require("./controllers");
const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const upload = multer({ dest: path.join(rootPath, "public/images/v3product") });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), postProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.single("image"), updateProduct);

module.exports = router;
