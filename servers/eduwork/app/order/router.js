const router = require("express").Router();
const { police_check } = require("../mw.js");
const { store, index } = require("./controller.js");

router.get("./orders", police_check("view", "Order"), index);
router.post("./orders", police_check("create", "Order"), store);

module.exports = router;
