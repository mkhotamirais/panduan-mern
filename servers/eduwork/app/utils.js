const { AbilityBuilder, Ability } = require("@casl/ability");

const handleErr = (err, res) => {
  if (err && err.name == "ValidationError") {
    return res.json({
      error: 1,
      message: err.message,
      fields: err.errors,
    });
  }
};

const policies = {
  guest(user, { can }) {
    can("read", "Product");
  },
  user(user, { can }) {
    can("create", "Category");
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { user_id: user._id });
    can("update", "User", { _id: user._id });
    can("read", "Cart", { user_id: user._id });
    can("update", "Cart", { _id: user._id });
    can("view", "deliveryAddress");
    can("create", "deliveryAddress", { user_id: user._id });
    can("update", "deliveryAddress", { user_id: user._id });
    can("delete", "deliveryAddress", { user_id: user._id });
    can("read", "Invoice", { user_id: user._id });
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};

const policyfor = (user) => {
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }
  return new Ability(builder.rules);
};

module.exports = { handleErr, policyfor };
