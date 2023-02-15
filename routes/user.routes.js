const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, name, userType, address, orders } = req.body;
  const userPresent = await UserModel.findOne({ email });
  if (userPresent) {
    res.send("User already exists, Please try Logging in");
  } else {
    try {
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({
            email,
            password: hash,
            name,
            userType,
            address,
            orders,
          });
          await user.save();
          res.send("Signup Successfull !!");
        }
      });
    } catch (err) {
      console.log(err);
      console.log("error in signup");
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hashed_password = user[0].password;
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.secret);
          res.send({
            msg: "Login successfull",
            token: token,
            userType: user[0].userType,
          });
        } else {
          res.send("Login failed");
        }
      });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Something went wrong, please try again later");
  }
});

module.exports = { userRouter };
