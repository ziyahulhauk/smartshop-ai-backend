const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ REGISTER
exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "User already exists",
        });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      message:
        "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ✅ LOGIN
exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res
        .status(400)
        .json({
          message:
            "Invalid Email",
        });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res
        .status(400)
        .json({
          message:
            "Invalid Password",
        });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        "secret123",
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ✅ GOOGLE LOGIN
exports.googleAuth =
  async (req, res) => {
    try {
      const {
        name,
        email,
        photo,
      } = req.body;

      let user =
        await User.findOne({
          email,
        });

      // create user if not exists
      if (!user) {
        user =
          await User.create({
            name,
            email,
            password:
              "google_login",
            photo,
          });
      }

      // token
      const token =
        jwt.sign(
          {
            id: user._id,
          },
          "secret123",
          {
            expiresIn:
              "7d",
          }
        );

      res.status(200).json({
        success: true,
        token,
        user,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Google Login Failed",
      });
    }
  };