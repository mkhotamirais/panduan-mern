const { show } = require("./controller");

const router = require("express").Router();

router.get("/invoices/:order_id", show);

module.exports = router;
