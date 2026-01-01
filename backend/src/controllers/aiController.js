const pool = require("../config/db");
const { calculateScore } = require("../utils/productivity");

exports.aiInsights = async (req, res) => {
  const tasks = await pool.query(
    "SELECT * FROM tasks WHERE user_id=$1",
    [req.user.id]
  );

  const score = calculateScore(tasks.rows);

  res.json({
    productivityScore: score,
    suggestion:
      score < 50
        ? "Focus on high-priority tasks first"
        : "Great job! Maintain momentum"
  });
};
