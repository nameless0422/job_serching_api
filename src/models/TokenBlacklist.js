const mongoose = require('mongoose');

const TokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' }, // Automatically deletes after 7 days
});

module.exports = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
