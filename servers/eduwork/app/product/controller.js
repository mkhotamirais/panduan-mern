const path = require("path");
const { existsSync, unlinkSync, renameSync } = require("fs");
const Product = require("./model.js");
const { handleErr } = require("../utils.js");
const Category = require("../category/model.js");
const Tag = require("../tag/model.js");
const { rootPath } = require("../../config/constants.js");

const getProducts = async (req, res, next) => {
  try {
    let { skip = 0, limit, q = "", category = "", tags = [] } = req.query;
    let criteria = {};
    if (q.length) criteria = { ...criteria, name: { $regex: `${q}`, $options: "i" } };
    if (category.length) {
      category = await Category.findOne({ name: { $regex: `${category}`, $options: "i" } });
      if (category) criteria = { ...criteria, category: category._id };
    }
    if (tags.length) {
      tags = await Tag.find({ name: { $in: tags } });
      criteria = { ...criteria, tags: { $in: tags.map((tag) => tag._id) } };
    }
    let count = await Product.find(criteria).countDocuments();
    let products = await Product.find(criteria)
      .sort({ createdAt: -1 })
      .select("-__v")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "category", select: "-__v" })
      .populate({ path: "tags", select: "-__v" });
    return res.json({ count, data: products });
  } catch (err) {
    next(err);
  }
};

const postProductFromEduwork = async (req, res, next) => {
  try {
    let payload = req.body;
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });
      category ? (payload = { ...payload, category: category._id }) : delete payload.category;
    }
    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      tags.length ? (payload = { ...payload, tags: tags.map((tag) => tag._id) }) : delete payload.tags;
    }
    if (req.file) {
      let originalExt = path.extname(req.file.originalname);
      let fileName = req.file.filename + originalExt;
      let targetPath = path.resolve(rootPath, `public/images/products/${fileName}`);
      payload = { ...payload, image: fileName };
      const src = fs.createReadStream(req.file.path);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);
      src.on("end", async () => {
        try {
          let product = new Product(payload);
          await product.save();
          return res.json({ message: "add product success", product });
        } catch (err) {
          fs.unlinkSync(targetPath);
          handleErr(err, res);
          next(err);
        }
      });
      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json({ message: "add product success", product });
    }
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const postProduct = async (req, res, next) => {
  let { category, tags } = req.body;
  if (category) {
    let match = await Category.findOne({ name: { $regex: category, $options: "i" } });
    match ? (req.body.category = match?._id) : delete category;
  }
  if (tags && tags.length > 0) {
    let match = await Tag.find({ name: { $in: tags } });
    match.length ? (req.body.tags = [...match.map((tag) => tag._id)]) : delete tags;
  }
  if (req.file) {
    const { originalname, filename, path: pathFile, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(originalname);
    if (!validExt.includes(ext)) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return res.status(400).json({ message: `Extensi tidak valid` });
    } else if (size > 2000000) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return res.status(400).json({ message: `File max 2mb` });
    }

    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${filename + ext}`;
    try {
      const data = await Product.create(req.body);
      if (existsSync(pathFile)) renameSync(pathFile, pathFile + ext);
      res.status(201).json({ message: `post ${data?.name} success`, data });
    } catch (err) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      handleErr(err, res);
      next(err);
    }
  } else {
    try {
      const data = await Product.create(req.body);
      res.status(201).json({ message: `post ${data?.name} success`, data });
    } catch (err) {
      handleErr(err, res);
      next(err);
    }
  }
};

const deleteProductFromEduwork = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    !product ? res.send({ message: "no data found" }) : null;
    let currentImage = `${rootPath}/public/images/products/${product.image}`;
    fs.existsSync(currentImage) ? fs.unlinkSync(currentImage) : null;
    return res.json({ message: "delete product success", product });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return res.status(400).json({ message: `Data dengan id ${id} tidak ditemukan` });
    const pathImage = path.join(rootPath, "public/images", `${data.imageName}`);
    if (existsSync(pathImage)) unlinkSync(pathImage);
    await data.deleteOne({ _id: id });
    res.json({ message: `delete product ${data.name} berhasil`, data });
  } catch (error) {
    handleErr(err, res);
    next(err);
  }
};

const updateProductFromEduwork = async (req, res, next) => {
  try {
    let payload = req.body;
    let { id } = req.params;
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });
      category ? (payload = { ...payload, category: category._id }) : delete payload.category;
    }
    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      tags.length ? (payload = { ...payload, tags: tags.map((tag) => tag._id) }) : delete payload.tags;
    }
    if (req.file) {
      let originalExt = path.extname(req.file.originalname);
      let fileName = req.file.filename + originalExt;
      let targetPath = path.resolve(rootPath, `public/images/products/${fileName}`);
      payload = { ...payload, image: fileName };
      const src = fs.createReadStream(req.file.path);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);
      src.on("end", async () => {
        try {
          let product = await Product.findById(id);
          !product ? res.send({ message: "no data found" }) : null;
          let currentImage = `${rootPath}/public/images/products/${product.image}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          product = await Product.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
          });
          return res.json({ message: "update product success", product });
        } catch (err) {
          fs.unlinkSync(targetPath);
          handleErr(err, res);
          next(err);
        }
      });
      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
      });
      !product ? res.send({ message: "no data found" }) : null;
      return res.json({ message: "update product success", product });
    }
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  let { category, tags } = req.body;
  if (category) {
    let match = await Category.findOne({ name: { $regex: category, $options: "i" } });
    match ? (req.body.category = match?._id) : delete category;
  }
  if (tags && tags.length > 0) {
    let match = await Tag.find({ name: { $in: tags } });
    match.length ? (req.body.tags = [...match.map((tag) => tag._id)]) : delete tags;
  }
  if (req.file) {
    const data = await Product.findById(id);
    const { originalname, filename, path: pathFile, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(originalname);

    if (!data) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return res.status(400).json({ message: `Data dengan id ${id} tidak ditemukan` });
    }
    if (!validExt.includes(ext)) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return res.status(400).json(`extensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(pathFile)) unlinkSync(pathFile);
      return res.status(400).json(`File max 2mb`);
    }

    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${filename + ext}`;
    try {
      const result = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
      const pathImage = path.join(rootPath, "public/images", `${data.imageName}`);
      if (!existsSync(pathImage) && !result.imageName) {
        renameSync(pathFile, pathFile + ext);
        return res.json({ message: `update ${req.body.name} success`, result });
      }
      if (existsSync(pathImage)) unlinkSync(pathImage);
      renameSync(pathFile, pathFile + ext);
      return res.json({ message: `update ${req.body.name} success`, result });
    } catch (err) {
      if (existsSync(pathFile + ext)) unlinkSync(pathFile + ext);
      if (existsSync(pathFile)) unlinkSync(pathFile);
      handleErr(err, res);
      next(err);
    }
  } else {
    try {
      const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
      return res.json({ message: `update ${req.body.name} success`, data });
    } catch (err) {
      handleErr(err, res);
      next(err);
    }
  }
};

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
