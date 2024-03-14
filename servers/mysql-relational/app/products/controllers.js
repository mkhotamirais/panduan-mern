const User = require("../user/model");
const Product = require("./model");

const GetProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "createdAt", "updatedAt"],
      include: [{ model: User, attributes: ["id", "name", "age"] }],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(400).json({ message: "produk tidak ditemukan" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const FilterProductByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.findAll({
      attributes: ["name", "price"],
      // where: { [Op.and]: [{ userId }, { price: req.userId }] },
      where: { userId },
      include: [{ model: User, attributes: ["name", "age"] }],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const PostProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(200).json({ message: "Berhasil menambah produk" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(400).json({ message: "produk tidak ditemukan" });
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Berhasil hapus produk" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(400).json({ message: "produk tidak ditemukan" });
    if (!req.body.name || !req.body.price) return res.status(400).json({ message: "Field harus diisi" });
    await Product.update(req.body, { where: { id } });
    res.status(200).json({ message: "Berhasil update produk" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { GetProducts, GetProductById, PostProduct, UpdateProduct, DeleteProduct, FilterProductByUser };
