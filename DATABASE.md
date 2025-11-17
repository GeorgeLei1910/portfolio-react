# Database Setup Guide

This portfolio application now uses PostgreSQL as the database backend. All data is dynamically loaded from the database instead of being hardcoded in the React components.

## Architecture

- **Frontend**: React app (port 3000)
- **Backend**: Node.js/Express API (port 5000)
- **Database**: PostgreSQL (port 5432)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
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
| id | SERIAL | Primary key |
| type | VARCHAR(50) | Section type (programmer, musician) |
| blurb | TEXT | Bio text |
| image_path | VARCHAR(255) | Image filename |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update date |

### Timeline Entries Table
Stores timeline events.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| type | VARCHAR(50) | Section type |
| year | VARCHAR(10) | Year of event |
| title | VARCHAR(255) | Event title |
| description | TEXT | Event description |
| image_url | VARCHAR(500) | Image URL |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update date |

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
docker exec -it portfolio-postgres psql -U portfolio_user -d portfolio_db

# Or using local psql
psql -h localhost -p 5432 -U portfolio_user -d portfolio_db
```

### Access the Database with a GUI Tool

You can use any PostgreSQL GUI client to connect to your database. Here are popular options:

#### Connection Details
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `portfolio_db`
- **Username**: `portfolio_user`
- **Password**: `portfolio_password`

#### Recommended GUI Tools

**1. pgAdmin (Free, Official PostgreSQL Tool)**
- Download: https://www.pgadmin.org/download/
- After installation, create a new server connection with the details above

**2. DBeaver (Free, Cross-platform)**
- Download: https://dbeaver.io/download/
- Supports PostgreSQL and many other databases
- Create a new PostgreSQL connection with the details above

**3. TablePlus (Free tier available)**
- Download: https://tableplus.com/
- Modern, user-friendly interface
- Create a new PostgreSQL connection

**4. DataGrip (Paid, by JetBrains)**
- Download: https://www.jetbrains.com/datagrip/
- Professional IDE for databases
- 30-day free trial available

**5. Postico (Mac only, Free trial)**
- Download: https://eggerapps.at/postico/
- Beautiful native Mac app

#### Quick Setup Example (pgAdmin)

1. Open pgAdmin
2. Right-click "Servers" → "Create" → "Server"
3. In the "General" tab, enter a name (e.g., "Portfolio DB")
4. In the "Connection" tab, enter:
   - Host: `localhost`
   - Port: `5432`
   - Database: `portfolio_db`
   - Username: `portfolio_user`
   - Password: `portfolio_password`
5. Click "Save"

**Note**: Make sure your Docker container is running (`docker ps`) before connecting.

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
INSERT INTO bios (type, blurb, image_path) 
VALUES ('programmer', 'Your bio text here', 'image.jpg');
```

**Add a new timeline entry:**
```sql
INSERT INTO timeline_entries (type, year, title, description, image_url)
VALUES ('programmer', '2024', 'New Achievement', 'Description here', 'https://example.com/image.png');
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

### 2. Set Up PostgreSQL

Install PostgreSQL and create a database:
```sql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'portfolio_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
```

### 3. Configure Environment

Create `backend/.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db
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
1. Change default database credentials
2. Use environment variables for sensitive data
3. Enable SSL for database connections
4. Implement authentication for API endpoints
5. Use HTTPS for all connections
6. Implement rate limiting
7. Add CORS restrictions

## Troubleshooting

### Database Connection Issues

**Check if PostgreSQL is running:**
```bash
docker ps | grep postgres
```

**View database logs:**
```bash
docker logs portfolio-postgres
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

