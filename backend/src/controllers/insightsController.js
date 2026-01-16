exports.getInsights = async (req, res) => {
  const { range = "week" } = req.query;
  const userId = req.user.id;

  // TODO: replace with DB aggregation
  res.json({
    stats: {
      completedTasks: 32,
      focusTimeMinutes: 1260,
      productivityScore: 84,
    },
    charts: {
      productivityTrend: [
        { label: "Mon", value: 62 },
        { label: "Tue", value: 68 },
        { label: "Wed", value: 74 },
        { label: "Thu", value: 80 },
        { label: "Fri", value: 84 },
      ],
      taskCompletion: [
        { label: "Mon", value: 4 },
        { label: "Tue", value: 6 },
        { label: "Wed", value: 5 },
        { label: "Thu", value: 7 },
        { label: "Fri", value: 10 },
      ],
    },
    aiInsights: [
      "Your productivity peaks on Thursdays.",
      "You complete more tasks when deadlines are set.",
    ],
    focusSuggestions: [
      "Schedule deep work between 10–12 AM.",
      "Avoid task switching in the afternoon.",
    ],
  });
};
