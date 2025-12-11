const express = require('express');
const router = express.Router();
const pool = require('../db');

function transformSkillsRow(row) {
  return {
    id: row.id,
    type: row.type,
    skill: row.skill,
    imageUrl: `/img/${row.image_url}`, // Transform image_path to imagePath and add /img/ prefix
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    subtype: row.subtype,
    experience: row.experience_year
  };
}
// GET Skill by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const skills = await pool.query('SELECT * FROM skills WHERE type = $1', [type]);
    
    if (skills.rows.length === 0) {
      return res.status(404).json({ error: 'Skills not found' });
    }
    
    const transformedRows = skills.rows.map(transformSkillsRow);

    const skillsMap = new Map();

    transformedRows.forEach((item) => {    
      if (!skillsMap.has(item.subtype)) {
        skillsMap.set(item.subtype, [])
      }
      skillsMap.get(item.subtype).push(item);
    });

    const skillsObject = Object.fromEntries(skillsMap);
    res.json(skillsObject);

    } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

