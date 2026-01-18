const calculateProductivityScore = (tasks) => {
  if (!tasks.length) return 0;

  let score = 0;
  let maxScore = 0;

  tasks.forEach(task => {
    let weight = 1;

    if (task.priority === "high") weight = 3;
    if (task.priority === "medium") weight = 2;

    maxScore += weight;
    if (task.completed) score += weight;
  });

  return Math.round((score / maxScore) * 100);
};

module.exports = { calculateProductivityScore };
