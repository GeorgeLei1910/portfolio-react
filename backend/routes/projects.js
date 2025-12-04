const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM projects';
    let values = [];

    if (type) {
      query += ' WHERE type = $1 ORDER BY title ASC';
      values = [type];
    } else {
      query += ' ORDER BY title ASC';
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET projects by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const result = await pool.query(
      'SELECT * FROM projects WHERE type = $1 ORDER BY title ASC',
      [type]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

