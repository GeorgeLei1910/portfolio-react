const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all timeline entries

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM timeline_entries';
    let values = [];

    if (type) {
      query += ' WHERE type = $1 ORDER BY year ASC';
      values = [type];
    } else {
      query += ' ORDER BY year ASC';
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET timeline entries by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const result = await pool.query(
      'SELECT * FROM timeline_entries WHERE type = $1 ORDER BY year ASC',
      [type]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

