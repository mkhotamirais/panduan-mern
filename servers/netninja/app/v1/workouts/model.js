const { Schema, model } = require("mongoose");

const v1WorkoutSchema = new Schema(
  {
    title: { type: String, unique: true, minLength: [3, "panjang produk minimal 3 karakter"], required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("V1Workout", v1WorkoutSchema);
