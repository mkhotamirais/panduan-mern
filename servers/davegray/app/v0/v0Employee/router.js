const rolesList = require("../../../config/rolesList");
const { verifyRoles } = require("../../../middleware/verifyAuth");
const { getEmployees, postEmployee, updateEmployee, deleteEmployee } = require("./controllers");

const router = require("express").Router();

router.get("/", getEmployees);
router.post("/", verifyRoles(rolesList.Admin, rolesList.Editor), postEmployee);
router.patch("/:id", verifyRoles(rolesList.Admin, rolesList.Editor), updateEmployee);
router.delete("/:id", verifyRoles(rolesList.Admin), deleteEmployee);

module.exports = router;
