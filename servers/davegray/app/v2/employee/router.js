const { verifyToken } = require("../../../middleware/verifyAuth");
const { getEmployees, postEmployee, updateEmployee, deleteEmployee, getEmployee } = require("./controllers");

const router = require("express").Router();

router.use(verifyToken);
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", postEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
