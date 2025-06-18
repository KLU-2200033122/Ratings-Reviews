const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
};

// POST a review
exports.addReview = async (req, res) => {
  const { user_id, rating, review, photo_url } = req.body;
  const product_id = req.params.id;

  try {
    await Review.create({
      user: user_id,
      product: product_id,
      rating,
      review,
      photo_url
    });
    res.send('Review submitted successfully');
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send('You already reviewed this product.');
    }
    res.status(500).send(err.message);
  }
};

// GET reviews for a product (with user name)
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Error fetching reviews');
  }
};
