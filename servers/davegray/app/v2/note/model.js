const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const v2NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "V2User" },
  },
  {
    timestamps: true,
  }
);

// v2NoteSchema.plugin(AutoIncrement, {
//   inc_field: "ticket",
//   id: "ticketNums",
//   start_seq: 500,
// });

module.exports = mongoose.model("V2Note", v2NoteSchema);
