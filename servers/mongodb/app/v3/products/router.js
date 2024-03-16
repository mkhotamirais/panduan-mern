const { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct } = require("./controllers");
const path = require("path");
const router = require("express").Router();
const multer = require("multer");
const { rootPath } = require("../../../config/constants");
const upload = multer({ dest: path.join(rootPath, "public/images/v3product") });

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", upload.single("image"), postProduct);
router.patch("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
