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

// POST create project
router.post('/', async (req, res) => {
  try {
    const { type, title, description, image_url } = req.body;
    const result = await pool.query(
      'INSERT INTO projects (type, title, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, title, description, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url } = req.body;
    const result = await pool.query(
      'UPDATE projects SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
      [title, description, image_url, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

