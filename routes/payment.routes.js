const stripe = require("stripe")(
  "sk_test_51Mbgx1SAy4JICqoSCbodWPdg0vOLzNydvTp9450J9YKrqtnDx8KxVJOIn7JZXaSkUDrwOdOYIP2WHQSTttlccjyv00siCdj9Tw"
);
const express = require("express");

const paymentRouter = express.Router();
paymentRouter.post("/", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Products",
          },
          unit_amount: 5500,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://vowelcart.vercel.app/success",
    cancel_url: "https://vowelcart.vercel.app/cancel",
  });
  res.redirect(303, session.url);
});

module.exports = { paymentRouter };
