const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} = require(
  "../controllers/wishlistController"
);

router.post(
  "/add",
  addToWishlist
);

router.get(
  "/:userId",
  getWishlist
);

router.delete(
  "/remove",
  removeWishlistItem
);

module.exports = router;