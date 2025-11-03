const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bioRoutes = require('./routes/bio');
const timelineRoutes = require('./routes/timeline');
const { initDatabase } = require('./scripts/init-schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database schema on startup
initDatabase();

// Routes
app.use('/api/bio', bioRoutes);
app.use('/api/timeline', timelineRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Database connection test
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

