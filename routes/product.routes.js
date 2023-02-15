const express = require("express");
const { ProductModel } = require("../models/Product.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const users = await ProductModel.find(query);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong" });
  }
});

productRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send({ msg: "Created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong" });
  }
});

productRouter.patch("/edit/:id", async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id }, payload);
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong, try again later" });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id });
    res.send(`Product ${_id} deleted successfully`);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong, try again later" });
  }
});

module.exports = { productRouter };
