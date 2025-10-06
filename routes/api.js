const express = require("express");
const db = require("../config/database");

const router = express.Router();

/**
 * @route GET /api/players-scores
 * @description List all players and their scores
 */
router.get("/players-scores", async (req, res) => {
  try {
    const query = `
      SELECT 
        p.name AS player_name,
        g.title AS game_title,
        s.score,
        s.date_played
      FROM players p
      INNER JOIN scores s ON p.id = s.player_id
      INNER JOIN games g ON s.game_id = g.id
      ORDER BY p.name, s.date_played
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /players-scores:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch players and scores",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/top-players
 * @description Find top 3 players with highest total scores
 */
router.get("/top-players", async (req, res) => {
  try {
    const query = `
      SELECT 
        p.name AS player_name,
        SUM(s.score) AS total_score
      FROM players p
      INNER JOIN scores s ON p.id = s.player_id
      GROUP BY p.id, p.name
      ORDER BY total_score DESC
      LIMIT 3
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /top-players:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch top players",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/inactive-players
 * @description Find players who haven't played any games
 */
router.get("/inactive-players", async (req, res) => {
  try {
    const query = `
      SELECT 
        p.name AS player_name,
        p.join_date
      FROM players p
      LEFT JOIN scores s ON p.id = s.player_id
      WHERE s.id IS NULL
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /inactive-players:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch inactive players",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/popular-genres
 * @description Find popular game genres based on play count
 */
router.get("/popular-genres", async (req, res) => {
  try {
    const query = `
      SELECT 
        g.genre,
        COUNT(s.id) AS times_played
      FROM games g
      INNER JOIN scores s ON g.id = s.game_id
      GROUP BY g.genre
      ORDER BY times_played DESC
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /popular-genres:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch popular genres",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/recent-players
 * @description Find players who joined in last 30 days
 */
router.get("/recent-players", async (req, res) => {
  try {
    const query = `
      SELECT 
        name AS player_name,
        join_date
      FROM players
      WHERE join_date >= CURRENT_DATE - INTERVAL '30 days'
      ORDER BY join_date DESC
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /recent-players:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch recent players",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/favorite-games
 * @description Find each player's favorite game (most played)
 */
router.get("/favorite-games", async (req, res) => {
  try {
    const query = `
      WITH player_game_counts AS (
        SELECT 
          p.id AS player_id,
          p.name AS player_name,
          g.id AS game_id,
          g.title AS game_title,
          COUNT(s.id) AS times_played,
          ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY COUNT(s.id) DESC) AS rank
        FROM players p
        INNER JOIN scores s ON p.id = s.player_id
        INNER JOIN games g ON s.game_id = g.id
        GROUP BY p.id, p.name, g.id, g.title
      )
      SELECT 
        player_name,
        game_title,
        times_played
      FROM player_game_counts
      WHERE rank = 1
      ORDER BY player_name
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in /favorite-games:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch favorite games",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/stats
 * @description Get overall statistics
 */
router.get("/stats", async (req, res) => {
  try {
    const [totalPlayers, totalGames, totalScores, avgScore] = await Promise.all(
      [
        db.query("SELECT COUNT(*) FROM players"),
        db.query("SELECT COUNT(*) FROM games"),
        db.query("SELECT COUNT(*) FROM scores"),
        db.query("SELECT AVG(score) FROM scores"),
      ]
    );

    res.json({
      success: true,
      data: {
        totalPlayers: parseInt(totalPlayers.rows[0].count),
        totalGames: parseInt(totalGames.rows[0].count),
        totalScores: parseInt(totalScores.rows[0].count),
        averageScore: parseFloat(avgScore.rows[0].avg || 0).toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error in /stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
      message: error.message,
    });
  }
});

module.exports = router;
