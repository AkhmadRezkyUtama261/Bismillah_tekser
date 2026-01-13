const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "tekser_user",
  password: process.env.DB_PASS || "password123",
  database: process.env.DB_NAME || "sewa_kamera",
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;