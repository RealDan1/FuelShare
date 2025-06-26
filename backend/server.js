// backend/server.js
// Entry point for Express backend

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mapsRoutes = require('./routes/maps');

const app = express();

// Middlewares
app.use(cors({ origin: '*' })); // allow all for MVP – tighten later
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', mapsRoutes);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));