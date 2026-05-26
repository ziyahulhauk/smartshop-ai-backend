const Cart = require("../models/Cart");

// ➕ Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      cart.products.push({ productId, quantity });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 📦 Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).populate("products.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ❌ Remove Product
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};