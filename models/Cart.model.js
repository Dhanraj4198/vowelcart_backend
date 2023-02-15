const mongoose = require("mongoose");

const cartSchema = {
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
};

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
