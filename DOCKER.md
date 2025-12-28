# Docker Setup for Portfolio React App

## Quick Start

### Development Mode (with Hot Reloading) ⚡

For development with automatic updates when you save files:

```bash
# Build and start in development mode
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build

# Stop the application
docker-compose -f docker-compose.dev.yml down
```

**Features:**
- ✅ Hot reloading - Changes reflect automatically when you save
- ✅ Source code mounted as volume - Edit files directly on your machine
- ✅ Development server on port 3000
- ✅ Fast Refresh enabled

**Note:** The first build may take a few minutes. After that, changes will be reflected immediately when you save files.

### Production Mode

For production deployment:

```bash
# Build and start the application
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the application
docker-compose down
```

### Using Docker directly
```bash
# Build the image
docker build -t portfolio-react .

# Run the container
docker run -p 3000:80 portfolio-react
```

## Access the Application
Once running, your portfolio will be available at:
- http://localhost:3000

## Docker Files

1. **Dockerfile** - Production multi-stage build:
   - Stage 1: Builds the React app using Node.js
   - Stage 2: Serves the app using nginx

2. **Dockerfile.dev** - Development build:
   - Runs React development server with hot reloading
   - Mounts source code for live updates

3. **docker-compose.yml** - Production orchestration:
   - Builds and runs the container
   - Maps port 3000 to container port 80
   - Includes restart policy

4. **docker-compose.dev.yml** - Development orchestration:
   - Mounts source code as volumes
   - Runs development server on port 3000
   - Enables hot reloading

5. **nginx.conf** - Optimized nginx configuration:
   - Handles React Router properly
   - Includes security headers
   - Enables gzip compression
   - Caches static assets

6. **.dockerignore** - Excludes unnecessary files from build context

## Production Deployment

For production deployment, consider:
- Using a reverse proxy (like Traefik or nginx)
- Setting up SSL certificates
- Using environment variables for configuration
- Implementing health checks

## Development vs Production

### Development Mode (`docker-compose.dev.yml`)
- Uses `Dockerfile.dev` which runs `npm start` (React dev server)
- Mounts source code as volumes for hot reloading
- Runs on port 3000 with React's development server
- Includes polling options for file watching on Windows
- Faster iteration during development

### Production Mode (`docker-compose.yml`)
- Uses `Dockerfile` which builds and serves with nginx
- Optimized build with minification
- Serves static files efficiently
- Better performance and smaller image size
- Suitable for deployment

### Switching Between Modes

**Start Development:**
```bash
docker-compose -f docker-compose.dev.yml up
```

**Start Production:**
```bash
docker-compose up
```

**Stop Both:**
```bash
# Stop development
docker-compose -f docker-compose.dev.yml down

# Stop production
docker-compose down
```

**Note:** Make sure to stop one before starting the other if they use the same ports.

