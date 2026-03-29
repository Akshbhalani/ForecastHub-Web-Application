const NodeCache = require('node-cache');
const Cache = require('../models/Cache');

class CacheService {
  constructor() {
    this.memoryCache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 600 });
    this.useMongo = false;
  }

  async initialize() {
    try {
      // Check if MongoDB is connected
      await mongoose.connection.db?.admin().ping();
      this.useMongo = true;
      console.log('Using MongoDB for caching');
    } catch (error) {
      console.log('Using in-memory cache (MongoDB not available)');
    }
  }

  async get(key) {
    // Try MongoDB first if available
    if (this.useMongo) {
      try {
        const cached = await Cache.findOne({ key });
        if (cached) {
          return cached.data;
        }
      } catch (error) {
        console.log('MongoDB cache read failed, falling back to memory');
      }
    }

    // Fallback to memory cache
    return this.memoryCache.get(key);
  }

  async set(key, data) {
    // Store in MongoDB if available
    if (this.useMongo) {
      try {
        await Cache.findOneAndUpdate(
          { key },
          { key, data },
          { upsert: true, new: true }
        );
      } catch (error) {
        console.log('MongoDB cache write failed, using memory only');
      }
    }

    // Always store in memory as backup
    this.memoryCache.set(key, data);
  }

  generateKey(city, type, days = null) {
    return `${city.toLowerCase()}_${type}${days ? `_${days}` : ''}`;
  }
}

module.exports = new CacheService();