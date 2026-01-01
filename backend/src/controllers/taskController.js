const pool = require("../config/db");

const createTask = async (req, res) => {
  console.log("REQ USER:", req.user);
  console.log("REQ BODY:", req.body);

  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  await pool.query(
    `INSERT INTO tasks (user_id, title, description, priority, status, due_date)
     VALUES ($1, $2, $3, $4, 'pending', $5)`,
    [req.user.id, title, description, priority, dueDate]
  );

  res.json({ message: "Task created successfully" });
};

const getTasks = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id]
  );

  res.json(result.rows);
};

module.exports = {
  createTask,
  getTasks
};
