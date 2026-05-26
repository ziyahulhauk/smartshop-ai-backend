const Razorpay = require("razorpay");

const razorpay =
  new Razorpay({
    key_id:
      process.env
        .RAZORPAY_KEY_ID,

    key_secret:
      process.env
        .RAZORPAY_SECRET,
  });

exports.createOrder =
  async (req, res) => {
    try {
      const options = {
        amount:
          req.body.amount * 100,

        currency: "INR",

        receipt:
          "smartshop_receipt",
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Payment Error",
      });
    }
  };