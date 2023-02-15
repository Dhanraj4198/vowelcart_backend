const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { paymentRouter } = require("./routes/payment.routes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Backend of Vowel Web, use '/user' for user routes & '/products' for product routes"
  );
});
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening on PORT 8080");
});
