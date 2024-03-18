const { Op } = require("sequelize");
const User = require("../user/model");
const Product = require("./model");
const { badRequest, ok, created } = require("../../utils");

const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        // attributes: ["uuid", "name", "price"],
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Product.findAll({
        // attributes: ["uuid", "name", "price"],
        where: { userId: req.userId },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    ok(res, `get products`, response);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { uuid: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        // attributes: ["uuid", "name", "price"],
        where: { id: product.id },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Product.findOne({
        // attributes: ["uuid", "name", "price"],
        where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    ok(res, `get product`, response);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({ name, price, userId: req.userId });
    created(res, `post ${name} success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { uuid: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, price } = req.body;
    if (req.role === "admin") {
      await Product.update({ name, price }, { where: { id: product.id } });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.update({ name, price }, { where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] } });
    }
    ok(res, `update ${product?.name} success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { uuid: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await Product.destroy({ where: { id: product.id } });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.destroy({ where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] } });
    }
    ok(res, `delete ${product?.name} success`);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

module.exports = { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
