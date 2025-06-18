const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,

  // ✅ Email verification fields
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: String
});

module.exports = mongoose.model('User', userSchema);
