const express = require('express');
const router = express.Router();
const pool = require('../db');

function transformProjectRow(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    imageUrl: `/img/${row.image_url}`, // Transform image_path to imagePath and add /img/ prefix
    url: row.link,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function transformMiniSkillsRow(row) {
  return {
    projectId: row.project_id,
    skillsId: row.skills_id,
    type: row.skill,
    imageUrl: `/img/${row.image_url}`
  }
}


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

    const transformedRows = result.rows.map(transformProjectRow);
    res.json(transformedRows);
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
    const transformedRows = result.rows.map(transformProjectRow);

    const skillsResult = await pool.query(
      "SELECT p.id as \"project_id\", s.id as \"skills_id\", s.skill, s.image_url "
      + "FROM skills s, projects p, project_skills ps "
      + "WHERE p.type = $1 and ps.skills_id = s.id and p.id = ps.project_id",
        [type]
      );
  
      const transformedSkillsRows = skillsResult.rows.map(transformMiniSkillsRow)
  
      const skillsMap = new Map();
  
      transformedSkillsRows.forEach((item) => {    
        if (!skillsMap.has(item.projectId)) {
          skillsMap.set(item.projectId, [])
        }
        skillsMap.get(item.projectId).push(item);
      });
  
      transformedRows.forEach((v) => {
          v.skills = skillsMap.get(v.id);
      })
  

    res.json(transformedRows);
    } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

