const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.json(user); // return user object with _id
  } catch (err) {
    res.status(500).send('Signup failed');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json(user);
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Login failed');
  }
});

module.exports = router;
