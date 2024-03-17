const Workout = require("./model");
const { ok, badRequest, created } = require("../../utils");
const { isValidObjectId } = require("mongoose");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ createdAt: -1 });
    ok(res, "get workouts", workouts);
  } catch (error) {
    badRequest(res, error?.message);
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
  const workout = await Workout.findById(id);
  ok(res, "get workout", workout);
};

const postWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;
    const emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!load) emptyFields.push("load");
    if (!reps) emptyFields.push("reps");
    if (emptyFields.length > 0) return res.status(400).json({ message: "please fill in all the fields", emptyFields });
    req.body.userId = req.user._id;
    const workout = await Workout.create(req.body);
    created(res, `post data success`, workout);
  } catch (error) {
    badRequest(res, error?.message);
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) return badRequest(res, `data tidak ditemukan`);
  ok(res, `delete data success`, workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
  const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
  if (!workout) return badRequest(res, `data tidak ditemukan`);
  ok(res, `update data success`, workout);
};

module.exports = { getWorkouts, getWorkout, postWorkout, deleteWorkout, updateWorkout };
