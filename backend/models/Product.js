// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("Product", productSchema);
