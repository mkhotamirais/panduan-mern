const { ok, badRequest, created } = require("../../utils");
const User = require("../user/model");
const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["userId"] },
      include: [{ model: User, attributes: ["id", "name", "age"] }],
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
    if (!product) return badRequest(res, `data id ${id} tidak ditemukan`);
    ok(res, `get prodct`, product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const FilterProductByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.findAll({
      // attributes: ["name", "price"],
      // where: { [Op.and]: [{ userId }, { price: req.userId }] },
      where: { userId },
      include: [{ model: User, attributes: ["name", "age"] }],
    });
    res.status(200).json(products);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    created(res, `post data success`);
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
    ok(res, `delete data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return badRequest(res, `data id ${id} tidak ditemukan`);
    if (!req.body.name || !req.body.price) return res.status(400).json({ message: "Field harus diisi" });
    await Product.update(req.body, { where: { id } });
    ok(res, `update data success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getProduct, getProducts, postProduct, updateProduct, deleteProduct, FilterProductByUser };
