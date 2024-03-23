const { handleErr } = require("../utils.js");
const Category = require("./model.js");

const getCategories = async (req, res, next) => {
  try {
    let count = await Category.find().countDocuments();
    let category = await Category.find().sort({ updatedAt: -1 }).select("-__v");
    return res.json({ count, data: category });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const postCategory = async (req, res, next) => {
  try {
    let category = await Category.create(req.body);
    res.json({ message: "add category success", data: category });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    let category = await Category.findByIdAndDelete(req.params.id);
    !category ? res.send({ message: "no data found" }) : null;
    return res.json({ message: "delete category success", data: category });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !category ? res.send({ message: "no data found" }) : null;
    return res.json({ message: "update category success", data: category });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

module.exports = { getCategories, postCategory, deleteCategory, updateCategory };
