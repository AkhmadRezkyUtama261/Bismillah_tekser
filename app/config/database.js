require("dotenv").config();
const mysql = require("mysql2/promise");

// bikin 1 koneksi saja
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "tekser_user",
  password: process.env.DB_PASS || "password123",
  database: process.env.DB_NAME || "sewa_kamera",
});

// optional: tes koneksi saat app start
(async () => {
  try {
    await db;
    console.log("✅ Database connected (single connection)");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = db;
