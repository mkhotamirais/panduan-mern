const { police_check } = require("../mw.js");
const {
  getDelivaryAddresses,
  postDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
} = require("./controller.js");

const router = require("express").Router();

router.get("/", police_check("view", "deliveryAddress"), getDelivaryAddresses);
router.post("/", police_check("create", "deliveryAddress"), postDeliveryAddress);
router.patch("/:id", police_check("update", "deliveryAddress"), updateDeliveryAddress);
router.delete("/:id", police_check("delete", "deliveryAddress"), deleteDeliveryAddress);

module.exports = router;
