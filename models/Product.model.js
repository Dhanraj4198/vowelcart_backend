const mongoose = require("mongoose");

const productSchema = {
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

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
