const pool = require('../db');

function transformBioRow(row) {
  return {
    id: row.id,
    type: row.type,
    blurb: row.blurb,
    imagePath: row.image_path ? `/img/${row.image_path}` : null, // Transform image_path to imagePath and add /img/ prefix
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

const getBio = async (type) => {
    const result = await pool.query('SELECT * FROM bios WHERE type = $1', [type]);
    
    if (result.rows.length === 0) {
      throw new Error('Bio not found');
    }
    
    const transformedRow = transformBioRow(result.rows[0]);
    return transformedRow;
}

module.exports = { getBio };