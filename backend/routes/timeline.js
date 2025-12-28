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
    imageUrl: `/img/${row.image_url}`,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function transformMiniSkillsRow(row) {
  return {
    timelineId: row.timeline_id,
    skillsId: row.skills_id,
    type: row.skill,
    imageUrl: `/img/${row.image_url}`
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

    const skillsResult = await pool.query(
    "SELECT te.id as \"timeline_id\", s.id as \"skills_id\", s.skill, s.image_url "
    + "FROM skills s, timeline_entries te, timeline_skills ts "
    + "WHERE te.type = $1 and ts.skills_id = s.id and te.id = ts.timeline_id ORDER BY year ASC",
      [type]
    );

    const transformedSkillsRows = skillsResult.rows.map(transformMiniSkillsRow)

    const skillsMap = new Map();

    transformedSkillsRows.forEach((item) => {    
      if (!skillsMap.has(item.timelineId)) {
        skillsMap.set(item.timelineId, [])
      }
      skillsMap.get(item.timelineId).push(item);
    });

    transformedRows.forEach((v) => {
        v.skills = skillsMap.get(v.id);
    })

    res.json(transformedRows);
    } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

