const pool = require("../config/db");

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // KPIs
    const kpis = await pool.query(
      `
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE completed = true) AS completed,
        COUNT(*) FILTER (WHERE completed = false) AS pending
      FROM tasks
      WHERE user_id = $1
      `,
      [userId]
    );

    // Today tasks
    const todayTasks = await pool.query(
      `
      SELECT id, title, priority
      FROM tasks
      WHERE user_id = $1
        AND DATE(due_date) = CURRENT_DATE
        AND completed = false
      ORDER BY priority DESC
      LIMIT 5
      `,
      [userId]
    );

    res.json({
      stats: kpis.rows[0],
      todayTasks: todayTasks.rows,
      notifications: [
        "⚠️ Review pending tasks",
        "🔥 Stay consistent today"
      ],
      focus: {
        message: "Focus on high‑priority tasks",
        suggestion: "Finish tasks due today first"
      }
    });
  } catch (err) {
    next(err);
  }
};
