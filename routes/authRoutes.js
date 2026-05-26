const express =
  require("express");

const router =
  express.Router();

const {
  register,
  login,
  googleAuth,
} = require(
  "../controllers/authController"
);

// register
router.post(
  "/register",
  register
);

// login
router.post(
  "/login",
  login
);

// google login
router.post(
  "/google",
  googleAuth
);

module.exports =
  router;