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

// POST create timeline entry
router.post('/', async (req, res) => {
  try {
    const { type, year, title, description, image_url } = req.body;
    const result = await pool.query(
      'INSERT INTO timeline_entries (type, year, title, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [type, year, title, description, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update timeline entry
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, description, image_url } = req.body;
    const result = await pool.query(
      'UPDATE timeline_entries SET year = $1, title = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [year, title, description, image_url, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Timeline entry not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE timeline entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM timeline_entries WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Timeline entry not found' });
    }
    
    res.json({ message: 'Timeline entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

