exports.calculateTrends = ({ total, completed, pending }) => {
  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    totalTasks: Number(total),
    completedTasks: Number(completed),
    pendingTasks: Number(pending),
    completionRate, // For progress charts
    productivityLabel:
      completionRate >= 70
        ? "High Productivity"
        : completionRate >= 40
        ? "Moderate Productivity"
        : "Needs Improvement",
  };
};
