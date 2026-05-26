const Review = require(
  "../models/Review"
);

// ➕ Add Review
exports.addReview =
  async (req, res) => {
    try {
      const review =
        await Review.create(
          req.body
        );

      res.json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  };

// 📦 Get Product Reviews
exports.getReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          productId:
            req.params.productId,
        });

      res.json(reviews);
    } catch (err) {
      res.status(500).json(err);
    }
  };