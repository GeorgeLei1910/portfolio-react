# Database Setup Guide

This portfolio application now uses SQLite3 as the database backend. All data is dynamically loaded from the database instead of being hardcoded in the React components.

## Architecture

- **Frontend**: React app (port 3000)
- **Backend**: Node.js/Express API (port 5000)
- **Database**: SQLite3 (port 1432)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
docker-compose up -d
```

This will start:
- SQLite3 database
- Backend API server
- Frontend React app

The app will be available at http://localhost:3000

### 2. Verify Database is Running

Check if the database is initialized:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/test-db
```

## Database Schema

### Bios Table
Stores biographical information for different sections (programmer, musician).

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Primary key |
| type | TEXT | Section type (programmer, musician) |
| blurb | TEXT | Bio text |
| image_path | TEXT | Image filename |
| created_at | DATETIME | Creation date |
| updated_at | DATETIME | Last update date |

### Timeline Entries Table
Stores timeline events.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Primary key |
| type | TEXT | Section type |
| year | TEXT | Year of event |
| title | TEXT | Event title |
| description | TEXT | Event description |
| image_url | TEXT | Image URL |
| created_at | DATETIME | Creation date |
| updated_at | DATETIME | Last update date |

## API Endpoints

### Bio Endpoints
- `GET /api/bio` - Get all bios
- `GET /api/bio?type=programmer` - Get bios by type
- `GET /api/bio/:type` - Get specific bio by type
- `POST /api/bio` - Create new bio
- `PUT /api/bio/:id` - Update bio
- `DELETE /api/bio/:id` - Delete bio

### Timeline Endpoints
- `GET /api/timeline` - Get all timeline entries
- `GET /api/timeline?type=programmer` - Get entries by type
- `GET /api/timeline/:type` - Get timeline by type
- `POST /api/timeline` - Create new entry
- `PUT /api/timeline/:id` - Update entry
- `DELETE /api/timeline/:id` - Delete entry

### Health Check
- `GET /api/health` - Backend health check
- `GET /api/test-db` - Test database connection

## Managing Data

### Access the Database Directly

```bash
# Using Docker
docker exec -it portfolio-sqlite3 sqlite3 /var/lib/sqlite3/portfolio_db

# Or using local sqlite3 (if database file is accessible)
sqlite3 ./sqlite3_data/portfolio_db
```

### Access the Database with a GUI Tool

You can use any SQLite3 GUI client to connect to your database. Here are popular options:

#### Connection Details
- **Database File**: `./sqlite3_data/portfolio_db` (relative to project root)
- **Or via Docker**: The database file is located at `/var/lib/sqlite3/portfolio_db` inside the container

#### Recommended GUI Tools

**1. DB Browser for SQLite (Free, Open Source)**
- Download: https://sqlitebrowser.org/
- Official SQLite browser tool
- Simple and easy to use
- Open the database file directly: `./sqlite3_data/portfolio_db`

**2. DBeaver (Free, Cross-platform)**
- Download: https://dbeaver.io/download/
- Supports SQLite3 and many other databases
- Create a new SQLite connection and point to the database file

**3. TablePlus (Free tier available)**
- Download: https://tableplus.com/
- Modern, user-friendly interface
- Create a new SQLite connection and select the database file

**4. DataGrip (Paid, by JetBrains)**
- Download: https://www.jetbrains.com/datagrip/
- Professional IDE for databases
- 30-day free trial available
- Supports SQLite3 connections

**5. SQLiteStudio (Free, Open Source)**
- Download: https://sqlitestudio.pl/
- Cross-platform SQLite manager
- Open source and free

#### Quick Setup Example (DB Browser for SQLite)

1. Download and install DB Browser for SQLite
2. Open the application
3. Click "Open Database"
4. Navigate to your project directory and select `./sqlite3_data/portfolio_db`
5. You can now browse tables, run queries, and edit data

**Note**: Make sure your Docker container is running (`docker ps`) and the database file exists before connecting.

### Common Queries

**View all bios:**
```sql
SELECT * FROM bios;
```

**View all timeline entries:**
```sql
SELECT * FROM timeline_entries ORDER BY year;
```

**Add a new bio:**
```sql
INSERT INTO bios (type, blurb, image_path, created_at, updated_at) 
VALUES ('programmer', 'Your bio text here', 'image.jpg', datetime('now'), datetime('now'));
```

**Add a new timeline entry:**
```sql
INSERT INTO timeline_entries (type, year, title, description, image_url, created_at, updated_at)
VALUES ('programmer', '2024', 'New Achievement', 'Description here', 'https://example.com/image.png', datetime('now'), datetime('now'));
```

### Using cURL

**Get programmer bio:**
```bash
curl http://localhost:5000/api/bio/programmer
```

**Get musician timeline:**
```bash
curl http://localhost:5000/api/timeline/musician
```

**Create a new bio:**
```bash
curl -X POST http://localhost:5000/api/bio \
  -H "Content-Type: application/json" \
  -d '{
    "type": "programmer",
    "blurb": "New bio text",
    "image_path": "image.jpg"
  }'
```

## Local Development (Without Docker)

### 1. Install Dependencies

Backend:
```bash
cd backend
npm install
```

### 2. Set Up SQLite3

SQLite3 is a file-based database, so no separate installation is needed. The database file will be created automatically when the backend starts.

Ensure the `sqlite3_data` directory exists:
```bash
mkdir -p sqlite3_data
```

### 3. Configure Environment

Create `backend/.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite3://portfolio_db
```

Or if using a file path:
```
DATABASE_URL=./sqlite3_data/portfolio_db
```

### 4. Run Backend

```bash
cd backend
npm start
# or with hot reload
npm run dev
```

### 5. Run Frontend

```bash
# In the root directory
npm start
```

## Database Initialization

The database schema is automatically initialized when the backend starts. Sample data is inserted if the tables are empty.

To manually initialize:
```bash
cd backend
npm run init-db
```

## Security Notes

**For Production:**
1. Use environment variables for sensitive data
2. Implement authentication for API endpoints
3. Use HTTPS for all connections
4. Implement rate limiting
5. Add CORS restrictions
6. Secure the SQLite database file with proper file permissions
7. Consider database encryption for sensitive data
8. Regular backups of the database file

## Troubleshooting

### Database Connection Issues

**Check if SQLite3 is running:**
```bash
docker ps | grep sqlite3
```

**View database logs:**
```bash
docker logs portfolio-sqlite3
```

**Reset the database:**
```bash
docker-compose down -v
docker-compose up -d
```

### Backend Issues

**Check backend logs:**
```bash
docker logs portfolio-backend
```

**Restart backend:**
```bash
docker-compose restart backend
```

### Frontend Can't Connect to API

Update the API URL in `docker-compose.yml` for the frontend service:
```yaml
environment:
  - REACT_APP_API_URL=http://localhost:5000
```

## Next Steps

- [ ] Add authentication for API endpoints
- [ ] Implement admin panel for content management
- [ ] Add image upload functionality
- [ ] Set up database backups
- [ ] Add Redis for caching
- [ ] Implement search functionality

