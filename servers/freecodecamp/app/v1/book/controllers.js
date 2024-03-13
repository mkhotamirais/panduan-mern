const { ok, badRequest, notFound, created } = require("../../utils");
const Book = require("./model");

const getBooks = async (req, res) => {
  try {
    const data = await Book.find();
    ok(res, "get data", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findById(id);
    if (!data) return notFound(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, "get book by id", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postBook = async (req, res) => {
  const { title, author, publishYear } = req.body;
  if (!title || !author || !publishYear) return badRequest(res, "Semua field harus diisi");
  try {
    const data = await Book.create(req.body);
    created(res, "tambah data berhasil", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) return badRequest(res, "Semua field harus diisi");
    const data = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) return notFound(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, `Ubah data id ${id} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findByIdAndDelete(id);
    if (!data) return notFound(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, `hapus data dengan id ${id} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getBooks, getSingleBook, postBook, deleteBook, updateBook };
