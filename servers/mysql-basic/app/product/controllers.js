const Product = require("./model");

const GetProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.json(error);
  }
};

const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.parent.message });
  }
};

const PostProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Isi semua field yang tidak boleh kosong" });
    const product = await Product.create(req.body);
    res.status(200).json({ message: `Add product '${name}' success`, product });
  } catch (error) {
    res.status(400).json({ message: error.parent.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: `Delete product id '${id}' success` });
  } catch (error) {
    res.status(400).json({ message: error.parent.message });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Isi semua field yang tidak bole kosong" });
    await Product.update(req.body, { where: { id } });
    res.status(200).json({ message: `Update product id '${id}' success` });
  } catch (error) {
    res.status(400).json({ message: error.parent.message });
  }
};

module.exports = { GetProducts, GetProductById, PostProduct, DeleteProduct, UpdateProduct };
