const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all timeline entries

function transformTimelineRow(row) {
  return {
    id: row.id,
    type: row.type,
    year: row.year,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}


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

    const transformedRows = result.rows.map(transformTimelineRow);
    res.json(transformedRows);
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
    const transformedRows = result.rows.map(transformTimelineRow);
    res.json(transformedRows);
    } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

