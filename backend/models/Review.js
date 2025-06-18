const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    photo_url: String,
    created_at: { type: Date, default: Date.now }
});
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });
module.exports = mongoose.model('Review', ReviewSchema);
