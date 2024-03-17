// const ROLES_LIST = require("../../config/rolesList");
// const { verifyRoles } = require("../../middleware/verifyUser");
// const { GetAllEmployees, GetSingleEmployee, DeleteEmployee, UpdateEmployee, CreateNewEmployee } = require("./controllers");

const { getEmployees, getSingleEmployee, postEmployee, updateEmployee, deleteEmployee } = require("./controllers");

// const router = require("express").Router();

// router.get("/", GetAllEmployees);
// router.get("/:id", GetSingleEmployee);
// router.post("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), CreateNewEmployee);
// router.patch("/:id", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), UpdateEmployee);
// router.delete("/:id", verifyRoles(ROLES_LIST.Admin), DeleteEmployee);

// module.exports = router;

const router = require("express").Router();

router.get("/", getEmployees);
router.get("/:id", getSingleEmployee);
router.post("/", postEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
