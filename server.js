const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const reviewRoutes =
  require("./routes/reviewRoutes");

const wishlistRoutes =
  require("./routes/wishlistRoutes");


  const chatRoutes =
  require("./routes/chatRoutes");


const app = express();


// ✅ MIDDLEWARE FIRST
app.use(cors());

app.use(express.json());


// ✅ ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/chats",
  chatRoutes
);


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send(
    "SmartShop AI Backend Running 🚀"
  );
});


// ✅ DATABASE
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )
  .catch((err) =>
    console.log(err)
  );

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});