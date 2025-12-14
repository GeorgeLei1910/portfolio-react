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
      CREATE TABLE project_skills (
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

    // Insert sample timeline data
    const timelineCount = await pool.query(
      "SELECT COUNT(*) as count FROM timeline_entries"
    );
    if (parseInt(timelineCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO timeline_entries (type, year, title, description, image_url) VALUES
        ('programmer', '2008', 'Started Programming', 'Started programming with Scratch.', 'https://example.com/scratch.png'),
        ('programmer', '2010', 'Learned HTML/CSS', 'Moved onto web development with HTML and CSS.', 'https://example.com/htmlcss.png'),
        ('programmer', '2013', 'Learned C++', 'Started learning C++ and created a buzzwire game.', 'https://example.com/cpp.png'),
        ('musician', '2008', 'Started Playing Piano', 'Started playing the piano at age 5.', 'https://example.com/piano.png'),
        ('musician', '2010', 'Picked Up Bass', 'Began playing bass guitar.', 'https://example.com/bass.png'),
        ('musician', '2015', 'Joined Bands', 'Started playing bass in various bands during middle and high school.', 'https://example.com/band.png')
      `);
      console.log("✓ Inserted sample timeline data");
    }

    const skillsCount = await pool.query(
      "SELECT COUNT(*) as count FROM skills"
    );
    if (parseInt(skillsCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO skills (type, skill, experience, image_url) VALUES
        ('programmer', 'Java', '5 Years', 'https://example.com/java.png'),
        ('programmer', 'Python', '3 Years', 'https://example.com/python.png'),
        ('programmer', 'JavaScript', '2 Years', 'https://example.com/javascript.png'),
        ('musician', 'Piano', '10 Years', 'https://example.com/piano.png'),
        ('musician', 'Bass', '8 Years', 'https://example.com/bass.png'),
        ('musician', 'Guitar', '5 Years', 'https://example.com/guitar.png')
      `);
      console.log("✓ Inserted sample skills data");
    }

    const projectsCount = await pool.query(
      "SELECT COUNT(*) as count FROM projects"
    );
    if (parseInt(projectsCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO projects (type, title, description, image_url, link) VALUES
        ('programmer', 'Project 1', 'Description 1', 'https://example.com/project1.png', 'https://example.com/project1'),
        ('programmer', 'Project 2', 'Description 2', 'https://example.com/project2.png', 'https://example.com/project2'),
        ('programmer', 'Project 3', 'Description 3', 'https://example.com/project3.png', 'https://example.com/project3'),
        ('musician', 'Project 4', 'Description 4', 'https://example.com/project4.png', 'https://example.com/project4'),
        ('musician', 'Project 5', 'Description 5', 'https://example.com/project5.png', 'https://example.com/project5')
      `);
      console.log("✓ Inserted sample projects data");
    }

    console.log("Database initialization completed!");
  } catch (err) {
    console.error("Error initializing database:", err.message);
    throw err;
  }
}

module.exports = { initDatabase };
