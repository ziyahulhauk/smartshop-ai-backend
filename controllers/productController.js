const Product = require("../models/Product");

// ➕ Add Product (Admin)
exports.addProduct = async (
  req,
  res
) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const product =
      await Product.create({
        name: req.body.name,

        description:
          req.body.description,

        price: req.body.price,

        category:
          req.body.category,

        stock: req.body.stock,

        image: req.file
          ? req.file.path
          : "",
      });

    res.status(201).json(
      product
    );

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        err.message,
    });
  }
};

// 📦 Get All Products
exports.getProducts =
  async (req, res) => {
    try {
      const search =
        req.query.search || "";

      const category =
        req.query.category || "";

      let filter = {};

      // 🔍 Search Filter
      if (search) {
        filter.name = {
          $regex: search,
          $options: "i",
        };
      }

      // 📦 Category Filter
      if (category) {
        filter.category =
          category;
      }

      const products =
        await Product.find(
          filter
        );

      res.json(products);

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

// 🔍 Get Single Product
exports.getProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    res.json(product);

  } catch (err) {
    res.status(500).json({
      message:
        err.message,
    });
  }
};

// ❌ Delete Product
exports.deleteProduct =
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };