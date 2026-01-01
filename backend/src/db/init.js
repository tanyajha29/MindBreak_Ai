// src/db/init.js
const pool = require("../config/db");

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
     CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(200) NOT NULL,
  description TEXT,

  priority VARCHAR(20) DEFAULT 'medium',  -- low | medium | high
  status VARCHAR(20) DEFAULT 'pending',   -- pending | in_progress | completed

  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    `);

    console.log("✅ Tables ensured");
  } catch (err) {
    console.error("❌ Table init failed", err.message);
  }
};

module.exports = initDB;
