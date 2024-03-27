const Order = require("../order/model.js");
const { Types } = require("mongoose");
const OrderItem = require("../order-item/model.js");
const DeliveryAddress = require("../deliveryAddress/model.js");
const CartItem = require("../cart-item/model.js");

const store = async (req, res, next) => {
  try {
    let { delivery_fee, delivey_address } = feq.body;
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    if (!items) {
      return res.json({
        error: 1,
        message: "You are not create order because you have no items in cart",
      });
    }
    let address = await DeliveryAddress.findById(delivey_address);
    let order = new Order({
      _id: new Types.ObjectId(),
      status: "waiting_payment",
      delivery_fee: delivery_fee,
      delivey_address: {
        provinsi: address.provinsi,
        kabupaten: address.kabupaten,
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
        detail: address.detail,
      },
      user: req.user._id,
    });
    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...item,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.qty),
        order: order._id,
        product: item.product._id,
      }))
    );
    orderItems.forEach((item) => order.order_items.push(item));
    order.save();
    await CartItem.deleteMany({ user: req.user._id });
    return res.json(order);
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (res, req, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("order_items")
      .sort("-createdAt");
    return res.json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { index, store };
