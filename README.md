# 🎮 GameStudio API

A complete RESTful API for GameStudio built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Using Docker (Recommended)

npm init -y
npm install
npm i express dotenv pg

1. **Clone and run:**

```bash
docker-compose up -d
```

API Endpoints
Endpoint Method Description
/ GET API information
/health GET Health check
/api/players-scores GET All players and their scores
/api/top-players GET Top 3 players by total score
/api/inactive-players GET Players who haven't played games
/api/popular-genres GET Most popular game genres
/api/recent-players GET Players joined in last 30 days
/api/favorite-games GET Each player's favorite game
/api/stats GET Overall statistics
