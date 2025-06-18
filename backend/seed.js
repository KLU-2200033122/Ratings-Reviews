const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect("mongodb+srv://charitha:yourpassword123@cluster0.phyadiz.mongodb.net/ratingsDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error", err));

const products = [
  {
    name: "Red T-shirt",
    description: "Comfortable cotton t-shirt",
    category: "clothing",
    image: "red-tshirt.jpg"
  },
  {
    name: "Blue Jeans",
    description: "Slim fit denim",
    category: "clothing",
    image: "blue-jeans.jpg"
  },
  {
    name: "Smart Watch",
    description: "Fitness and notifications",
    category: "watches",
    image: "smart-watch.jpg"
  },
  {
    name: "Lipstick Kit",
    description: "Matte shades combo",
    category: "cosmetics",
    image: "lipstick-kit.jpg"
  },
  {
    name: "Running Shoes",
    description: "Lightweight and durable",
    category: "footwear",
    image: "running-shoes.jpg"
  },
  {
    name: "Formal Shoes",
    description: "Elegant leather shoes",
    category: "footwear",
    image: "formal-shoes.jpg"
  },
  {
    name: "Headphones",
    description: "Wireless over-ear",
    category: "gadgets",
    image: "headphones.jpg"
  },
  {
    name: "Smartphone X",
    description: "Latest high-speed phone",
    category: "gadgets",
    image: "smartphone-x.jpg"
  },
  {
    name: "Leather Wallet",
    description: "Slim design, brown color",
    category: "accessories",
    image: "wallet.jpg"
  },
  {
    name: "Backpack",
    description: "Spacious and stylish",
    category: "accessories",
    image: "backpack.jpg"
  }
];

async function seed() {
  try {
    await Product.deleteMany(); // Clear old
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
