# GameStudio API Docker Deployment Guide (Basic Version)

## Overview
This document provides complete instructions for building, running, and deploying the basic GameStudio API using Docker containers.

## Available Docker Images

### Docker Hub Images
- **Repository**: `shahidds/gamestudio-api`
- **Latest Version**: `latest` (v1.0)
- **Tagged Version**: `v1.0`

## Quick Start

### Using Pre-built Images from Docker Hub

1. **Pull the image**:
   ```bash
   docker pull shahidds/gamestudio-api:latest
   ```

2. **Run with Docker Compose** (Recommended):
   ```bash
   # Clone the repository
   git clone https://github.com/ShahidDS/gamestudio-api.git
   cd gamestudio-api
   
   # Start all services (API + PostgreSQL + pgAdmin)
   docker compose up -d
   ```

3. **Access the services**:
   - **API**: http://localhost:3000
   - **API Health Check**: http://localhost:3000/health
   - **pgAdmin**: http://localhost:8080 (admin@gamestudio.com / root)
   - **Database**: localhost:5432 (admin / root)

### Manual Docker Run

If you want to run just the API container manually:

```bash
# Run PostgreSQL first
docker run -d \
  --name postgres-gamestudio \
  -e POSTGRES_DB=gamestudio \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  postgres:15

# Run the API
docker run -d \
  --name gamestudio-api-basic \
  --link postgres-gamestudio:postgres \
  -e DB_HOST=postgres \
  -e DB_PORT=5432 \
  -e DB_NAME=gamestudio \
  -e DB_USER=admin \
  -e DB_PASSWORD=root \
  -p 3000:3000 \
  shahidds/gamestudio-api:latest
```

## Building Images Locally

### Prerequisites
- Docker installed on your system
- Git for cloning the repository

### Build Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShahidDS/gamestudio-api.git
   cd gamestudio-api
   ```

2. **Build the Docker image**:
   ```bash
   # Build with custom tag
   docker build -t your-username/gamestudio-api:custom .
   
   # Or build with multiple tags
   docker build -t your-username/gamestudio-api:latest -t your-username/gamestudio-api:v1.0 .
   ```

3. **Run the locally built image**:
   ```bash
   docker compose up -d
   ```

## Environment Configuration

### Environment Variables
The following environment variables can be configured:

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `postgres` | Database hostname |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `gamestudio` | Database name |
| `DB_USER` | `admin` | Database username |
| `DB_PASSWORD` | `root` | Database password |
| `PORT` | `3000` | API server port |
| `NODE_ENV` | `production` | Node environment |

### Custom Environment File
Create a `.env` file for custom configuration:

```env
# Database Configuration
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password

# Server Configuration
PORT=3000
NODE_ENV=production
```

## Pushing to Docker Hub

### Prerequisites
- Docker Hub account
- Docker CLI logged in to Docker Hub

### Steps to Push

1. **Login to Docker Hub**:
   ```bash
   docker login
   ```

2. **Tag your image**:
   ```bash
   docker tag gamestudio-api:latest your-username/gamestudio-api:latest
   docker tag gamestudio-api:latest your-username/gamestudio-api:v1.0
   ```

3. **Push to Docker Hub**:
   ```bash
   docker push your-username/gamestudio-api:latest
   docker push your-username/gamestudio-api:v1.0
   ```

## API Endpoints

Once running, the API provides the following endpoints:

- `GET /health` - Health check
- `GET /api/players` - Get all players
- `GET /api/games` - Get all games
- `GET /api/players/:id` - Get player by ID
- `GET /api/games/:id` - Get game by ID

## Features

This basic version includes:
- ✅ **Express.js Framework** - Web application framework
- ✅ **PostgreSQL Integration** - Database support
- ✅ **Docker Containerization** - Easy deployment
- ✅ **Basic CRUD Operations** - Create, Read, Update, Delete
- ✅ **Health Checks** - Service health monitoring
- ✅ **CORS Support** - Cross-origin resource sharing

## Comparison with Enhanced Version

| Feature | Basic (v1.0) | Enhanced (v2.0) |
|---------|--------------|-----------------|
| Express.js | ✅ | ✅ |
| PostgreSQL | ✅ | ✅ |
| Docker | ✅ | ✅ |
| Basic CRUD | ✅ | ✅ |
| Zod Validation | ❌ | ✅ |
| ESLint | ❌ | ✅ |
| Advanced Queries | ❌ | ✅ |
| Error Handling | Basic | Enhanced |
| Security Headers | ❌ | ✅ |

**For the enhanced version with Zod validation and ESLint, use:**
- Repository: `shahidds/gamestudio-api-eslintzod`
- GitHub: https://github.com/ShahidDS/gamestudio-api-eslintZod

## Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Ensure PostgreSQL is running
   - Check environment variables
   - Verify network connectivity between containers

2. **Port Already in Use**:
   ```bash
   # Find process using the port
   lsof -i :3000
   
   # Kill the process or use a different port
   docker run -p 3001:3000 shahidds/gamestudio-api:latest
   ```

3. **Image Pull Failed**:
   ```bash
   # Pull specific version
   docker pull shahidds/gamestudio-api:v1.0
   ```

### Logs and Debugging

```bash
# View container logs
docker logs gamestudio-api-basic

# View real-time logs
docker logs -f gamestudio-api-basic

# Access container shell
docker exec -it gamestudio-api-basic sh
```

## Cleanup

```bash
# Stop and remove containers
docker compose down

# Remove volumes (⚠️ This will delete data)
docker compose down -v

# Remove images
docker rmi shahidds/gamestudio-api:latest
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/ShahidDS/gamestudio-api/issues
- Docker Hub: https://hub.docker.com/r/shahidds/gamestudio-api