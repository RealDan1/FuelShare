// backend/routes/maps.js
// All Google-maps-proxy routes live here
//   /api/places       -> Places Autocomplete
//   /api/directions   -> Driving directions with optional alternatives
//   /api/distance     -> Distance Matrix

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const redisClient = require('../config/redisClient');

const router = express.Router();

// 150 requests per 15 minutes per IP – tweak later
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 150 });
router.use(limiter);

const GOOGLE_API_BASE = 'https://maps.googleapis.com/maps/api';
const KEY = process.env.GOOGLE_MAPS_KEY;
if (!KEY) {
  console.error('Missing GOOGLE_MAPS_KEY in environment');
  process.exit(1);
}

// Helper: generic cacher for GET requests
async function cachedFetch(cacheKey, url, params, ttlSeconds = 60 * 60 * 24) {
  // check redis first
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  // not cached → call Google
  const { data } = await axios.get(url, { params: { ...params, key: KEY } });
  // save to redis
  try {
    await redisClient.set(cacheKey, JSON.stringify(data), { EX: ttlSeconds });
  } catch (e) {
    console.warn('Redis set error', e);
  }
  return data;
}

// 1) Places Autocomplete – /api/places?input=Cap
router.get('/places', async (req, res) => {
  const { input } = req.query;
  if (!input) return res.status(400).json({ error: 'Missing input' });

  try {
    const data = await cachedFetch(
      `places:${input}`,
      `${GOOGLE_API_BASE}/place/autocomplete/json`,
      { input }
    );
    res.json(data.predictions || data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed places request' });
  }
});

// 2) Directions – /api/directions?origin=lat,lng&destination=lat,lng&alts=true
router.get('/directions', async (req, res) => {
  const { origin, destination, alts } = req.query;
  if (!origin || !destination)
    return res.status(400).json({ error: 'Missing origin or destination' });

  try {
    const data = await cachedFetch(
      `directions:${origin}:${destination}:${alts}`,
      `${GOOGLE_API_BASE}/directions/json`,
      {
        origin,
        destination,
        mode: 'driving',
        alternatives: alts === 'true',
      }
    );
    res.json(data.routes || data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed directions request' });
  }
});

// 3) Distance Matrix – /api/distance?origin=lat,lng&destination=lat,lng
router.get('/distance', async (req, res) => {
  const { origin, destination } = req.query;
  if (!origin || !destination)
    return res.status(400).json({ error: 'Missing origin or destination' });

  try {
    const data = await cachedFetch(
      `distance:${origin}:${destination}`,
      `${GOOGLE_API_BASE}/distancematrix/json`,
      {
        origins: origin,
        destinations: destination,
        mode: 'driving',
      },
      60 * 60 // 1 h TTL is enough for matrix
    );
    res.json(data.rows[0].elements[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed distance request' });
  }
});

// 4) Geocode – /api/geocode?place_id=xxx OR /api/geocode?address=string
router.get('/geocode', async (req, res) => {
  const { place_id, address } = req.query;
  if (!place_id && !address) return res.status(400).json({ error: 'Need place_id or address' });

  try {
    const cacheKey = place_id ? `geocode:${place_id}` : `geocode:${address}`;
    const data = await cachedFetch(
      cacheKey,
      `${GOOGLE_API_BASE}/geocode/json`,
      place_id ? { place_id } : { address }
    );
    if (!data.results?.length) return res.status(404).json({ error: 'No geocode results' });
    res.json(data.results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed geocode request' });
  }
});

module.exports = router;
