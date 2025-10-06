const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "gamestudio",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "root",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down database connections...");
  await pool.end();
  console.log("✅ Database connections closed");
  process.exit(0);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
