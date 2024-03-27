const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { rootPath } = require("../../config/constants.js");
const { getProducts, postProduct, updateProduct, deleteProduct } = require("./controller.js");
const upload = multer({ dest: path.join(rootPath, "public/images") }).single("image");
const { police_check } = require("../mw.js");

router.get("/", getProducts);
router.post("/", police_check("create", "Product"), upload, postProduct);
router.patch("/:id", police_check("update", "Product"), upload, updateProduct);
router.delete("/:id", police_check("delete", "Product"), deleteProduct);

module.exports = router;
