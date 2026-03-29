const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    } else {
      console.log('MongoDB URI not provided, using in-memory cache only');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Falling back to in-memory cache only');
  }
};

module.exports = connectDB;