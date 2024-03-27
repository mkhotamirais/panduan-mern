const { police_check } = require("../mw.js");
const { updateCart, getCart } = require("./controller.js");

const router = require("express").Router();

router.patch("/", police_check("update", "Cart"), updateCart);
router.get("/", police_check("read", "Cart"), getCart);

module.exports = router;
