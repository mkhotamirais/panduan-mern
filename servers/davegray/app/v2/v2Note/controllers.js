const Note = require("./model");
const User = require("../v2User/model");
const { badRequest, conflict, created, ok } = require("../../utils");

const getNotes = async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) return badRequest(res, "note tidak ditemukan");
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.userId).lean().exec();
      return { ...note, username: user.username };
    })
  );
  ok(res, "get notes", notesWithUser);
};

const postNote = async (req, res) => {
  const { userId, title, text } = req.body;
  if (!userId || !title || !text) return badRequest(res, "semua field harus diisi");
  const duplicate = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (duplicate) return conflict(res, "gunakan judul lain");
  const note = await Note.create({ userId, title, text });
  if (note) return created(res, "berhasil tambah note baru", note);
  else return badRequest(res, "data note salah");
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { userId, title, text, completed } = req.body;
  if (!userId || !title || !text || typeof completed !== "boolean") return badRequest(res, "semua field harus diisi");
  const note = await Note.findById(id).exec();
  if (!note) return badRequest(res, "note tidak ditemukan");
  const duplicate = await Note.findOne({ title }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) return conflict(res, "gunakan judul lain");
  note.userId = userId;
  note.title = title;
  note.text = text;
  note.completed = completed;
  const updatedNote = await note.save();
  ok(res, `berhasil update note ${updateNote.title}`, updatedNote);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!id) return badRequest(res, "id diperlukan");
  const note = await Note.findById(id).exec();
  if (!note) return badRequest(res, "note tidak ditemukan");
  const data = await note.deleteOne();
  ok(res, `berhasil hapus note ${data.title} dengan id ${data._id}`, data);
};

module.exports = { getNotes, postNote, updateNote, deleteNote };
