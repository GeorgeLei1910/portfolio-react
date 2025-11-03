# Docker Setup for Portfolio React App

## Quick Start

### Using Docker Compose (Recommended)
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

## Docker Files Created

1. **Dockerfile** - Multi-stage build:
   - Stage 1: Builds the React app using Node.js
   - Stage 2: Serves the app using nginx

2. **docker-compose.yml** - Easy orchestration:
   - Builds and runs the container
   - Maps port 3000 to container port 80
   - Includes restart policy

3. **nginx.conf** - Optimized nginx configuration:
   - Handles React Router properly
   - Includes security headers
   - Enables gzip compression
   - Caches static assets

4. **.dockerignore** - Excludes unnecessary files from build context

## Production Deployment

For production deployment, consider:
- Using a reverse proxy (like Traefik or nginx)
- Setting up SSL certificates
- Using environment variables for configuration
- Implementing health checks

## Development vs Production

The current setup is optimized for production. For development with hot reloading, you might want to create a separate docker-compose.dev.yml file that mounts your source code and runs `npm start` instead of serving the built files.

