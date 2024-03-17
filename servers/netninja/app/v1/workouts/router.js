const { deleteWorkout, updateWorkout, getWorkout, getWorkouts, postWorkout } = require("./controllers");

const router = require("express").Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", postWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
