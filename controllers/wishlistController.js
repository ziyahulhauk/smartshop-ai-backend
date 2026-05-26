const Wishlist = require(
  "../models/Wishlist"
);

// ❤️ Add To Wishlist
exports.addToWishlist =
  async (req, res) => {
    try {
      const {
        userId,
        productId,
      } = req.body;

      let wishlist =
        await Wishlist.findOne({
          userId,
        });

      if (!wishlist) {
        wishlist =
          await Wishlist.create({
            userId,

            products: [
              { productId },
            ],
          });
      } else {
        wishlist.products.push({
          productId,
        });

        await wishlist.save();
      }

      res.json(wishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  };

// 📦 Get Wishlist
exports.getWishlist =
  async (req, res) => {
    try {
      const wishlist =
        await Wishlist.findOne({
          userId:
            req.params.userId,
        }).populate(
          "products.productId"
        );

      res.json(wishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  };

// ❌ Remove Wishlist Item
exports.removeWishlistItem =
  async (req, res) => {
    try {
      const {
        userId,
        productId,
      } = req.body;

      const wishlist =
        await Wishlist.findOne({
          userId,
        });

      wishlist.products =
        wishlist.products.filter(
          (item) =>
            item.productId.toString() !==
            productId
        );

      await wishlist.save();

      res.json(wishlist);
    } catch (err) {
      res.status(500).json(err);
    }
  };