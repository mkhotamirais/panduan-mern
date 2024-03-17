const { ok, badRequest, created } = require("../../utils");
const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      // attributes: ['id']
      // attributes: {exclude: ['id']}
    });
    ok(res, `get products`, products);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    ok(res, `get product`, product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) return badRequest(res, "Isi semua field yang tidak boleh kosong");
    const product = await Product.create(req.body);
    created(res, `Post ${name} success`, product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return badRequest(res, `data id ${id} tidak ditemukan`);
    await Product.destroy({ where: { id } });
    ok(res, `delete product id '${id}' success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return badRequest(res, `data id ${id} tidak ditemukan`);
    const { name, price } = req.body;
    if (!name || !price) return badRequest(res, "Isi semua field yang tidak boleh kosong");
    await Product.update(req.body, { where: { id } });
    ok(res, `update product id '${id}' success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
