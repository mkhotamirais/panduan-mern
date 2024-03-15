const { badRequest, ok, created } = require("../utils");
const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    ok(res, "get products", products);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    ok(res, "get product", product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    created(res, `post ${req.body?.name} success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.update(req.body, { where: { id } });
    ok(res, `update data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id } });
    ok(res, `delete data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getProduct, getProducts, postProduct, updateProduct, deleteProduct };
