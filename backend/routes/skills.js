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

const getSkills = async (type) => {

  const typePattern = `%${type}%`;

  const skills = await pool.query('SELECT * FROM skills WHERE type like ?', [typePattern]);
  
  if (skills.rows.length === 0) {
          throw new Error('Skills not found');
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
  return skillsObject;
}

module.exports = { getSkills };
