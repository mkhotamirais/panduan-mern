const Note = require("./model");
const User = require("../user/model");
const { badRequest, conflict, created, ok } = require("../../utils");
const { isValidObjectId } = require("mongoose");

const getNotes = async (req, res) => {
  const notes = await Note.find()
    .select("-__v")
    .populate({ path: "userId", select: ["_id", "username", "roles", "active"] });
  if (!notes?.length) return badRequest(res, "note tidak ditemukan");
  // const notesWithUser = await Promise.all(
  //   notes.map(async (note) => {
  //     const user = await User.findById(note.userId).lean().exec();
  //     return { ...note, username: user.username };
  //   })
  // );
  ok(res, "get notes", notes);
};

const postNote = async (req, res) => {
  try {
    const { userId, title, text } = req.body;
    if (!userId || !title || !text) return badRequest(res, "semua field harus diisi");
    const matchUserId = await User.findOne({ _id: userId });
    if (!matchUserId) return badRequest(res, `user id tidak valid`);
    const dup = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();
    if (dup) return conflict(res, "gunakan judul lain");
    const note = await Note.create(req.body);
    created(res, "berhasil tambah note baru", note);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, text, completed } = req.body;
    if (!userId || !title || !text || typeof completed !== "boolean") return badRequest(res, "semua field harus diisi");
    if (!isValidObjectId(userId)) return badRequest(res, `userId tidak valid`);
    const matchUserId = await User.findOne({ _id: userId });
    if (!matchUserId) return badRequest(res, `user id tidak valid`);
    const note = await Note.findById(id);
    if (!note) return badRequest(res, "note tidak ditemukan");
    const dup = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();
    if (dup && dup?._id.toString() !== id) return conflict(res, "gunakan judul lain");
    const updatedNote = await Note.findByIdAndUpdate(id, req.body)
      .select("-__v")
      .populate({
        path: "userId",
        select: ["_id", "username", "roles", "active"],
      });

    ok(res, `berhasil update note ${updateNote.title}`, updatedNote);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!id) return badRequest(res, "id diperlukan");
  const note = await Note.findById(id).exec();
  if (!note) return badRequest(res, "note tidak ditemukan");
  const data = await Note.findByIdAndDelete(id);
  ok(res, `delete ${data.title} success`, data);
};

module.exports = { getNotes, postNote, updateNote, deleteNote };
