const { ok, badRequest, created } = require("../../utils");
const Product = require("./model");
const Category = require("../category/model");

const getProducts = async (req, res) => {
  try {
    let { skip = 0, limit, q = "", category = "", tags = [] } = req.query;
    let criteria = {};
    if (q.length) criteria = { ...criteria, name: { $regex: `${q}`, $options: "i" } };
    if (category.length) {
      category = await Category.findOne({ name: { $regex: `${category}`, $options: "i" } });
      if (category) criteria = { ...criteria, categoryId: category._id };
    }
    const data = await Product.find(criteria)
      .select("-__v")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "categoryId", select: ["name"] });
    ok(res, `get data`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    ok(res, `get single data`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postProduct = async (req, res) => {
  try {
    const matchCategoryId = await Category.findById(req.body.categoryId);
    if (!matchCategoryId) return badRequest(res, `kategori dengan id ${req.body.categoryId} tidak ditemukan`);
    const data = await Product.create(req.body);
    created(res, `Post data ${req.body.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId) return badRequest(res, `isi semua filed yang diperlukan`);
    if (name.length < 3) return badRequest(res, `panjang nama minimal 3 karakter`);
    const matchCategoryId = await Category.findById(categoryId);
    if (!matchCategoryId) return badRequest(res, `kategori dengan id ${categoryId} tidak ditemukan`);
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    ok(res, `update data ${data.name} success`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id, req.body);
    if (!data) return badRequest(res, `data dengan id ${id} tidak ditemukan`);
    ok(res, `delete data ${data.name} success`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct };
