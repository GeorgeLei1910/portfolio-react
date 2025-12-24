const pool = require("../db");

async function initDatabase() {
  try {
    console.log("Initializing database schema...");

    // Create bios table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        blurb TEXT,
        image_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ bios table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS project_skills (
            project_id INT,
            skills_id INT,
        UNIQUE(project_id, skills_id) ON CONFLICT ROLLBACK
      );
    `);

    console.log("✓ project_skills table ready");

    // Create timeline_entries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS timeline_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        year TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✓ timeline_entries table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        "type" TEXT NOT NULL,
        skill TEXT NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT (CURRENT_TIMESTAMP),
        updated_at DATETIME DEFAULT (CURRENT_TIMESTAMP),
        subtype TEXT, 
        experience_year INTEGER
      )
    `);
    console.log("✓ skills table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        link TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ projects table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS timeline_skills (
          timeline_id INT,
          skills_id INT,
          UNIQUE(timeline_id, skills_id) ON CONFLICT ROLLBACK
      );
    `);
    console.log("✓ timeline_skills ready");

    // Insert sample bios data
    const bioCount = await pool.query("SELECT COUNT(*) as count FROM bios");
    if (parseInt(bioCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO bios (type, blurb, image_path) VALUES
        ('programmer', 'Born in Hong Kong, raised in the nearby Macau, George Lei started programming with Scratch when he was 10 and then moved onto HTML/CSS at 12. At the age of 15, he learned C++ and made a simple buzzwire game. He always has an interest in creating programs. Now, he is a graduate from the University of British Columbia Major in Computer Science and Minor in Music Technology.', 'CSBoi4MP.jpg'),
        ('musician', 'Born in Hong Kong, raised in the nearby Macau. George Lei has experience with many instruments. He first played the piano when he was 5. He then picked the bass up when he was 10. During middle school and high school, he started playing bass for different bands. Also during that time, he has developed an interest for different instruments. He is a graduate of the University of British Columbia in Computer Science and minored in Music Technology.', 'MusicianBoi4MP.jpg')
      `);
      console.log("✓ Inserted sample bios data");
    }



    console.log("Database initialization completed!");
  } catch (err) {
    console.error("Error initializing database:", err.message);
    throw err;
  }
}

module.exports = { initDatabase };
