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

    await pool.query(`CREATE OR REPLACE FUNCTION get_task_insights(
  p_user_id INT,
  p_range TEXT
)
RETURNS JSON AS $$
DECLARE
  start_date DATE;
  result JSON;
BEGIN
  IF p_range = 'day' THEN
    start_date := CURRENT_DATE;
  ELSIF p_range = 'week' THEN
    start_date := CURRENT_DATE - INTERVAL '6 days';
  ELSE
    start_date := CURRENT_DATE - INTERVAL '29 days';
  END IF;

  SELECT json_build_object(
    'completed', COUNT(*) FILTER (WHERE status = 'completed'),
    'pending', COUNT(*) FILTER (WHERE status != 'completed'),
    'total', COUNT(*)
  )
  INTO result
  FROM tasks
  WHERE user_id = p_user_id
    AND created_at::date >= start_date;

  RETURN result;
END;
$$ LANGUAGE plpgsql;
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
