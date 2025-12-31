const pool = require('../db');

function transformProjectRow(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    embeddable: row.embeddable || null,
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

const getProjects = async (type) => {

  const typePattern = `%${type}%`;

    const result = await pool.query(
      'SELECT * FROM projects WHERE type LIKE ? ORDER BY title ASC',
      [typePattern]
    );
    const transformedRows = result.rows.map(transformProjectRow);

    const skillsResult = await pool.query(
      "SELECT p.id as \"project_id\", s.id as \"skills_id\", s.skill, s.image_url "
      + "FROM skills s, projects p, project_skills ps "
      + "WHERE p.type LIKE ? and ps.skills_id = s.id and p.id = ps.project_id",
        [typePattern]
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
    return transformedRows;
}

module.exports = { getProjects };