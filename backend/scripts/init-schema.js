const pool = require('../db');

async function initDatabase() {
  try {
    console.log('Initializing database schema...');

    // Create bios table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bios (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        blurb TEXT,
        image_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ bios table ready');

    // Create timeline_entries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS timeline_entries (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        year VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ timeline_entries table ready');

    // Insert sample bios data
    const bioCount = await pool.query('SELECT COUNT(*) FROM bios');
    if (parseInt(bioCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO bios (type, blurb, image_path) VALUES
        ('programmer', 'Born in Hong Kong, raised in the nearby Macau, George Lei started programming with Scratch when he was 10 and then moved onto HTML/CSS at 12. At the age of 15, he learned C++ and made a simple buzzwire game. He always has an interest in creating programs. Now, he is a graduate from the University of British Columbia Major in Computer Science and Minor in Music Technology.', 'CSBoi4MP.jpg'),
        ('musician', 'Born in Hong Kong, raised in the nearby Macau. George Lei has experience with many instruments. He first played the piano when he was 5. He then picked the bass up when he was 10. During middle school and high school, he started playing bass for different bands. Also during that time, he has developed an interest for different instruments. He is a graduate of the University of British Columbia in Computer Science and minored in Music Technology.', 'MusicianBoi4MP.jpg')
      `);
      console.log('✓ Inserted sample bios data');
    }

    // Insert sample timeline data
    const timelineCount = await pool.query('SELECT COUNT(*) FROM timeline_entries');
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
      console.log('✓ Inserted sample timeline data');
    }

    console.log('Database initialization completed!');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

module.exports = { initDatabase };

