require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "GameStudio API",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🎮 GameStudio API Server",
    version: "1.0.0",
    endpoints: {
      playersScores: "/api/players-scores",
      topPlayers: "/api/top-players",
      inactivePlayers: "/api/inactive-players",
      popularGenres: "/api/popular-genres",
      recentPlayers: "/api/recent-players",
      favoriteGames: "/api/favorite-games",
      health: "/health",
    },
    documentation: "Check README.md for API documentation",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log(`🎮 GameStudio API Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
