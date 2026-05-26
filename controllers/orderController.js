const Order = require("../models/Order");
const transporter =
  require("../config/email");

const User = require(
  "../models/User"
);
// 🛒 Create Order
exports.createOrder =
  async (req, res) => {
    try {
      const order =
        await Order.create(
          req.body
        );

      // 📧 Find User
      const user =
        await User.findById(
          req.body.userId
        );

      // 📧 Send Email
      await transporter.sendMail({
        from:
          process.env
            .EMAIL_USER,

        to: user.email,

        subject:
          "Order Confirmation",

        html: `
          <h1>🎉 Order Successful</h1>

          <p>Thank you for shopping with SmartShop AI.</p>

          <h3>Total Amount: ₹${req.body.totalAmount}</h3>

          <p>Your order has been placed successfully.</p>
        `,
      });

      res.json(order);
    } catch (err) {
      console.log(err);

      res.status(500).json(err);
    }
  };

// 📜 Get User Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};