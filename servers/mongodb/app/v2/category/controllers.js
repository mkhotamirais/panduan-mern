const { badRequest, ok, created } = require("../../utils");
const Category = require("./model");

const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    ok(res, "get categories", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, "get categoriy", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    created(res, `Post category ${data.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, `Update category ${req.body.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body.name);
    const data = await Category.findByIdAndDelete(id, req.body);
    if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, `Delete category ${data.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getCategories, getSingleCategory, postCategory, updateCategory, deleteCategory };
