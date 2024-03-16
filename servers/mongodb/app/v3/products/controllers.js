const { rootPath } = require("../../../config/constants");
const { badRequest, ok, created } = require("../../utils");
const Product = require("./model");
const { existsSync, unlinkSync, renameSync } = require("fs");
const path = require("path");

const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    ok(res, "get products", data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    ok(res, "get single product", data);
  } catch (error) {
    badRequest(res, error.message);
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
      const data = await Product.create(req.body);
      if (existsSync(pathFile)) renameSync(pathFile, pathFile + ext);
      created(res, `post product ${data.name} berhasil`, data);
    } catch (error) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      badRequest(res, error.message);
    }
  } else {
    try {
      const data = await Product.create(req.body);
      created(res, `post product ${data.name} berhasil`, data);
    } catch (error) {
      badRequest(res, error.message);
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    const pathImage = path.join(rootPath, "public/images/v3product", `${data.imageName}`);
    if (existsSync(pathImage)) unlinkSync(pathImage);
    await data.deleteOne({ _id: id });
    ok(res, `delete product ${data.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (req.file) {
    const data = await Product.findById(id);
    const { originalname, filename, path: pathFile, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(originalname);

    if (!data) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
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
      const result = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
      const pathImage = path.join(rootPath, "public/images/v3product", `${data.imageName}`);
      if (!existsSync(pathImage) && !result.imageName) {
        renameSync(pathFile, pathFile + ext);
        return ok(res, `update product ${req.body.name} berhasil`, result);
      }
      if (existsSync(pathImage)) unlinkSync(pathImage);
      renameSync(pathFile, pathFile + ext);
      return ok(res, `update product ${req.body.name} berhasil`, result);
    } catch (error) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      badRequest(res, error.message);
    }
  } else {
    try {
      const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
      ok(res, `update product ${req.body.name} berhasil`, data);
    } catch (error) {
      badRequest(res, error.message);
    }
  }
};

module.exports = { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct };
