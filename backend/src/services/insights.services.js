const pool = require("../config/db");

async function getInsights(userId, range) {
  const kpiRes = await pool.query(
    "SELECT get_task_insights($1, $2) AS kpis",
    [userId, range]
  );

  const chartRes = await pool.query(
    `
    SELECT
      to_char(created_at::date, 'Dy') AS day,
      COUNT(*) FILTER (WHERE status = 'completed') AS completed
    FROM tasks
    WHERE user_id = $1
      AND created_at::date >=
        CASE
          WHEN $2 = 'day' THEN CURRENT_DATE
          WHEN $2 = 'week' THEN CURRENT_DATE - INTERVAL '6 days'
          ELSE CURRENT_DATE - INTERVAL '29 days'
        END
    GROUP BY created_at::date
    ORDER BY created_at::date
    `,
    [userId, range]
  );

  return {
    kpis: kpiRes.rows[0].kpis,
    productivity: chartRes.rows,
  };
}

module.exports = { getInsights };
