// backend/config/redisClient.js
// Reusable Redis client
// Keeps Google API responses briefly to save quota + speed up UX

const redis = require('redis');

// Default to local Redis if REDIS_URL not supplied
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

client.on('error', (err) => console.error('Redis error', err));

(async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log('Redis connected');
    }
  } catch (e) {
    console.error('Failed to connect to Redis', e);
  }
})();

module.exports = client;
