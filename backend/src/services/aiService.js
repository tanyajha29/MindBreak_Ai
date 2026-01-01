export const recommendTask = (tasks) => {
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  return tasks
    .filter(t => t.status !== "Completed")
    .sort((a, b) =>
      priorityWeight[b.priority] - priorityWeight[a.priority] ||
      new Date(a.deadline) - new Date(b.deadline)
    )[0];
};
