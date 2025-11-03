const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all bios
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM bios';
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
    const result = await pool.query('SELECT * FROM bios WHERE type = $1', [type]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bio not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create bio
router.post('/', async (req, res) => {
  try {
    const { type, blurb, image_path } = req.body;
    const result = await pool.query(
      'INSERT INTO bios (type, blurb, image_path) VALUES ($1, $2, $3) RETURNING *',
      [type, blurb, image_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update bio
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, blurb, image_path } = req.body;
    const result = await pool.query(
      'UPDATE bios SET type = $1, blurb = $2, image_path = $3 WHERE id = $4 RETURNING *',
      [type, blurb, image_path, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bio not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE bio
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM bios WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bio not found' });
    }
    
    res.json({ message: 'Bio deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

