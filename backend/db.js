const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Parse DATABASE_URL to get the database file path
// Format: sqlite3://portfolio_db or sqlite3://./sqlite3_data/portfolio_db or sqlite3:///app/sqlite3_data/portfolio_db
let dbPath = process.env.DATABASE_URL || 'sqlite3://portfolio_db';

// Remove sqlite3:// prefix if present
if (dbPath.startsWith('sqlite3://')) {
  dbPath = dbPath.replace('sqlite3://', '');
  // Handle absolute paths (starting with /)
  if (dbPath.startsWith('/')) {
    // Keep as absolute path
  } else if (!dbPath.includes('/') && !dbPath.includes('\\')) {
    // If it's just a database name, create full path
    // Check if sqlite3_data directory exists, if not use current directory
    const dataDir = fs.existsSync('./sqlite3_data') ? './sqlite3_data' : '.';
    dbPath = path.join(dataDir, dbPath);
  }
}

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (dbDir !== '.' && !fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Check if database file exists before creating connection
const dbExists = fs.existsSync(dbPath);
if (!dbExists) {
  console.log('Database file does not exist. Creating new database:', dbPath);
}

// Create database connection (better-sqlite3 is synchronous)
// This will create the database file if it doesn't exist
const db = new Database(dbPath);

if (!dbExists) {
  console.log('✓ Database file created successfully');
} else {
  console.log('✓ Database file already exists');
}

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log('Connected to SQLite3 database:', dbPath);

// Convert PostgreSQL-style parameters ($1, $2, etc.) to SQLite3 style (?)
function convertParams(sql, params) {
  if (params.length === 0) return { sql, params };
  
  // Check if SQL uses PostgreSQL-style parameters
  if (sql.includes('$1')) {
    const convertedSql = sql.replace(/\$\d+/g, () => '?');
    return { sql: convertedSql, params };
  }
  return { sql, params };
}

// Create a pool-like interface for compatibility (async wrapper)
const pool = {
  query: async (sql, params = []) => {
    try {
      // Convert PostgreSQL-style parameters to SQLite3 style
      const { sql: convertedSql, params: convertedParams } = convertParams(sql, params);
      
      // Handle different query types
      const upperSql = convertedSql.trim().toUpperCase();
      
      if (upperSql.startsWith('SELECT')) {
        const stmt = db.prepare(convertedSql);
        const rows = convertedParams.length > 0 ? stmt.all(convertedParams) : stmt.all();
        return { rows };
      } else if (upperSql.startsWith('INSERT') || upperSql.startsWith('UPDATE') || upperSql.startsWith('DELETE')) {
        const stmt = db.prepare(convertedSql);
        const info = convertedParams.length > 0 ? stmt.run(convertedParams) : stmt.run();
        
        // For INSERT with RETURNING, we need to fetch the inserted row
        if (sql.toUpperCase().includes('RETURNING')) {
          const lastId = Number(info.lastInsertRowid);
          // Extract table name from INSERT/UPDATE/DELETE statement
          let tableName = 'bios';
          const fromMatch = sql.match(/FROM\s+(\w+)/i);
          const intoMatch = sql.match(/INTO\s+(\w+)/i);
          const updateMatch = sql.match(/UPDATE\s+(\w+)/i);
          tableName = fromMatch?.[1] || intoMatch?.[1] || updateMatch?.[1] || 'bios';
          
          const selectStmt = db.prepare(`SELECT * FROM ${tableName} WHERE rowid = ?`);
          const row = selectStmt.get(lastId);
          return { rows: row ? [row] : [], rowCount: info.changes };
        }
        
        return { rows: [], rowCount: info.changes };
      } else {
        // For other queries (CREATE TABLE, etc.)
        const stmt = db.prepare(convertedSql);
        stmt.run(convertedParams);
        return { rows: [], rowCount: 0 };
      }
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }
};

// Handle errors
process.on('SIGINT', () => {
  db.close();
  console.log('Database connection closed.');
  process.exit(0);
});

module.exports = pool;
