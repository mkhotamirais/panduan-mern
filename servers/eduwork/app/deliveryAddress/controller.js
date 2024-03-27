const { policyfor, handleErr } = require("../utils.js");
const DeliveryAddress = require("./model.js");
const { subject } = require("@casl/ability");

const getDelivaryAddresses = async (req, res, next) => {
  try {
    let user = req.user;
    let { skip = 0, limit = 10 } = req.query;
    let count, address;
    if (user.role === "admin") {
      count = await DeliveryAddress.find().countDocuments();
      address = await DeliveryAddress.find().skip(parseInt(skip)).limit(parseInt(limit)).sort("-createdAt");
    } else {
      count = await DeliveryAddress.find({
        user: req.user._id,
      }).countDocuments();
      address = await DeliveryAddress.find({ user: req.user._id })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort("-createdAt");
    }
    return res.json({ count, address });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const postDeliveryAddress = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    payload = { ...payload, user: user._id };
    let address = new DeliveryAddress(payload);
    await address.save();
    return res.json({ message: "add address success", address });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const updateDeliveryAddress = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let address = await DeliveryAddress.findById(req.params.id);
    let subjectAddress = subject("deliveryAddress", { ...address, user_id: address.user });
    let policy = policyfor(req.user);
    if (!policy.can("update", subjectAddress)) return res.json({ error: 1, message: "Not allowed to modify this resource" });
    address = await DeliveryAddress.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    return res.json({ message: "update address success", address });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

const deleteDeliveryAddress = async (req, res, next) => {
  try {
    let address = await DeliveryAddress.findById(req.params.id);
    let subjectAddress = subject("deliveryAddress", { ...address, user_id: address.user });
    let policy = policyfor(req.user);
    if (!policy.can("delete", subjectAddress)) return res.json({ error: 1, message: "Not allowed to modify this resource" });
    address = await DeliveryAddress.findByIdAndDelete(req.params.id);
    res.json({ message: "delete address success", address });
  } catch (err) {
    handleErr(err, res);
    next(err);
  }
};

module.exports = { getDelivaryAddresses, postDeliveryAddress, updateDeliveryAddress, deleteDeliveryAddress };
