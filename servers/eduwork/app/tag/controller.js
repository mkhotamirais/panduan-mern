const { handleErr } = require("../utils.js");
const Tag = require("./model.js");

const getTags = async (req, res, next) => {
  try {
    let count = await Tag.find().countDocuments();
    let tag = await Tag.find().select("-__v");
    return res.json({ count, tag });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const postTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.json({ message: "add tag success", tag });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    let tag = await Tag.findByIdAndDelete(req.params.id);
    !tag ? res.send({ message: "no data found" }) : null;
    res.json({ message: "delete tag success", tag });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const updateTag = async (req, res, next) => {
  try {
    let tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    !tag ? res.send({ message: "no data found" }) : null;
    return res.json({ message: "update tag success", tag });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

module.exports = { getTags, postTag, updateTag, deleteTag };
