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

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;      // ✅ THIS WAS MISSING
  const { status } = req.body;

 
  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const result = await pool.query(
    `UPDATE tasks
     SET status = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [status, id, req.user.id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(result.rows[0]);
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};
