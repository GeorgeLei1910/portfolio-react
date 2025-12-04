const express = require('express');
const router = express.Router();
const pool = require('../db');



// GET all bios
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM skills';
    let values = [];

    if (type) {
      query += ' WHERE type = $1';
      values = [type];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET bio by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const result = await pool.query('SELECT * FROM skills WHERE type = $1', [type]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skills not found' });
    }
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

