const { ok, badRequest, created } = require("../../utils");
const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const data = await Product.find().select("-__v");
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
    const data = await Product.create(req.body);
    created(res, "post data success", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
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
