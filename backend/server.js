// Temporary test
try {
  const test = require('better-sqlite3');
  console.log('✓ better-sqlite3 found:', test);
} catch (err) {
  console.error('✗ better-sqlite3 NOT FOUND:', err.message);
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const bioRoutes = require('./routes/bio');
const timelineRoutes = require('./routes/timeline');  
const skillsRoutes = require('./routes/skills');
const projectsRoutes = require('./routes/projects');

const { initDatabase } = require('./scripts/init-schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database schema on startup
initDatabase();

app.get('/api/:type', async (req, res) => {
  try{
    const { type } = req.params;
    const [bio, projects, skills, timeline] = await Promise.all([
      bioRoutes.getBio(type),
      projectsRoutes.getProjects(type),
      skillsRoutes.getSkills(type),
      timelineRoutes.getTimeline(type)
    ]);
    res.json({
      bio,
      projects,
      skills,
      timeline
    });
  }catch(err){
    console.error('Error fetching data:', err);
    res.status(500).json({error: err.message});
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Database connection test
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT datetime(\'now\') as time');
    res.json({ message: 'Database connected', time: result.rows[0].time });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

