const Product = require("./model");
const path = require("path");
const { existsSync, unlinkSync, renameSync } = require("fs");
const { badRequest, ok, created } = require("../../utils");
const { rootPath } = require("../../../config/constants");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    ok(res, `get products`, products);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return badRequest(res, `Product id ${id} tidak ditemukan`);
    ok(res, `get product`, product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const postProduct = async (req, res) => {
  if (req.file) {
    const { originalname, filename, path: pathFile, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(originalname);

    if (!validExt.includes(ext)) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `Extensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `File maksimal 2mb`);
    }

    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/v3product/${filename + ext}`;
    try {
      const product = await Product.create(req.body);
      if (existsSync(pathFile)) renameSync(pathFile, pathFile + ext);
      created(res, `post product ${product.name} berhasil`, product);
    } catch (error) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      badRequest(res, error?.original?.sqlMessage || error.message);
    }
  } else {
    try {
      const product = await Product.create(req.body);
      created(res, `post ${product.name} success`, product);
    } catch (error) {
      badRequest(res, error?.original?.sqlMessage || error.message);
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return badRequest(res, `Product id ${id} tidak ditemukan`);
    const pathImage = path.join(rootPath, "public/images/v3product", `${product.imageName}`);
    if (existsSync(pathImage)) unlinkSync(pathImage);
    await product.destroy({ where: { id } });
    ok(res, `delete ${product?.name} success`, product);
  } catch (error) {
    badRequest(res, error?.original?.sqlMessage || error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  if (req.file) {
    const { originalname, filename, path: pathFile, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(originalname);

    if (!product) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `Product id ${id} tidak ditemukan`);
    }
    if (!validExt.includes(ext)) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `Extensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `File maksimal 2mb`);
    }

    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/v3product/${filename + ext}`;
    try {
      await Product.update(req.body, { where: { id } });
      const pathImage = path.join(rootPath, "public/images/v3product", `${product.imageName}`);
      if (!existsSync(pathImage) && !product.imageName) {
        renameSync(pathFile, pathFile + ext);
        return ok(res, `update product id ${id} success`);
      }
      if (existsSync(pathImage)) unlinkSync(pathImage);
      renameSync(pathFile, pathFile + ext);
      return ok(res, `update ${product?.name} success`);
    } catch (error) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      badRequest(res, error?.original?.sqlMessage || error.message);
    }
  } else {
    try {
      if (!product) return badRequest(res, `Product id ${id} tidak ditemukan`);
      await Product.update(req.body, { where: { id } });
      ok(res, `update ${product?.name} success`);
    } catch (error) {
      badRequest(res, error?.original?.sqlMessage || error.message);
    }
  }
};

module.exports = { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
