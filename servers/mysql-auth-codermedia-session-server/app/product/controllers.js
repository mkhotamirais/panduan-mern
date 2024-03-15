const { Op } = require("sequelize");
const User = require("../user/model");
const Product = require("./model");

const GetProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        where: { userId: req.userId },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const GetProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { uuid: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: { id: product.id },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const CreateProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({ name, price, userId: req.userId });
    res.status(201).json({ msg: "Berhasil menambah produk" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const UpdateProduct = async (req, res) => {
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
    res.status(200).json({ msg: "Berhasil update produk" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { uuid: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await Product.destroy({ where: { id: product.id } });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.destroy({ where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] } });
    }
    res.status(200).json({ msg: "Berhasil hapus produk" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { GetProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct };
