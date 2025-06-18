const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');
const User = require('../models/User');
const Product = require('../models/Product');
const crypto = require('crypto');

// ✅ GET Products (optional filter by category)
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Failed to fetch products.");
  }
});

// ✅ POST a Review
router.post('/products/:id/review', controller.addReview);

// ✅ GET all Reviews for a Product
router.get('/products/:id/reviews', controller.getReviews);

// ✅ Signup Route with Duplicate Check & Verification Token
router.post('/users/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup request for:", email);

    const existingUser = await User.findOne({ email });

    // ✅ If a verified user already exists, block registration
    if (existingUser && existingUser.isVerified) {
      return res.status(400).send("Email already in use");
    }

    // ✅ Generate a verification token
    const token = crypto.randomBytes(20).toString("hex");
    let user;

    if (existingUser && !existingUser.isVerified) {
      // 🔁 If user exists but is not verified, update existing
      user = existingUser;
      user.name = name;
      user.password = password;
      user.verifyToken = token;
    } else {
      // ➕ Else create a new user
      user = new User({
        name,
        email,
        password,
        isVerified: true, // ✅ Email verification disabled for now
        verifyToken: token
      });
    }

    await user.save();

    // 🔐 Optionally, send verification email here using nodemailer

    res.status(200).json(user);
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send("Signup failed. Try again.");
  }
});

// ✅ Login Route with detailed messages
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Email not found");
      return res.status(401).send("Invalid credentials: email not registered");
    }

    if (user.password !== password) {
      console.log("❌ Incorrect password");
      return res.status(401).send("Invalid credentials: wrong password");
    }

    if (!user.isVerified) {
      console.log("❌ Email not verified");
      return res.status(403).send("Please verify your email before logging in.");
    }

    console.log("✅ Login success:", user.name);
    res.json(user);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Login failed. Try again.");
  }
});

module.exports = router;
