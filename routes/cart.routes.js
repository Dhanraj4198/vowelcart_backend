const express = require("express");
const { CartModel } = require("../models/Cart.model");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const users = await CartModel.find(query);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong" });
  }
});

cartRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const product = new CartModel(payload);
    await product.save();
    res.send({ msg: "Created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong" });
  }
});

cartRouter.patch("/edit/:id", async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    const query = await CartModel.findByIdAndUpdate({ _id }, payload);
    console.log(query);
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong, try again later" });
  }
});

cartRouter.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await CartModel.findByIdAndDelete({ _id });
    res.send(`Product ${_id} deleted successfully`);
  } catch (err) {
    console.log(err);
    res.send({ err: "something went wrong, try again later" });
  }
});

module.exports = { cartRouter };
