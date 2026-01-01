exports.calculateScore = (tasks) => {
  if (!tasks.length) return 0;
  const completed = tasks.filter(t => t.status === "completed").length;
  return Math.round((completed / tasks.length) * 100);
};
