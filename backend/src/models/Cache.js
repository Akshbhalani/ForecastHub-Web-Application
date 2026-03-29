const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.CACHE_TTL || 600 // TTL in seconds
  }
});

module.exports = mongoose.model('Cache', cacheSchema);