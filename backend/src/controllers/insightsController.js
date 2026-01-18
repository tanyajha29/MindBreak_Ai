const { getInsights } = require("../services/insights.services");

exports.getInsights = async (req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware
    const range = req.query.range || "week";

    const data = await getInsights(userId, range);

    // AI-style insights (rule-based)
    const aiInsights = [];
    if (data.kpis.completed > data.kpis.pending) {
      aiInsights.push("🔥 Great job! You're completing more tasks than pending.");
    } else {
      aiInsights.push("⚠️ You have pending tasks. Try prioritizing today’s tasks.");
    }

    res.json({
      ...data,
      aiInsights,
    });
  } catch (err) {
    next(err);
  }
};
