const analyzeTask = (task) => {
  const text = task.toLowerCase();

  let priorityHint = "Medium";
  let urgencyHint = "Normal";

  // 🔥 High urgency keywords
  if (
    text.includes("urgent") ||
    text.includes("asap") ||
    text.includes("deadline") ||
    text.includes("today")
  ) {
    priorityHint = "High";
    urgencyHint = "High";
  }

  // 🧠 Large / complex task detection
  if (
    text.length > 80 ||
    text.includes("project") ||
    text.includes("build") ||
    text.includes("develop")
  ) {
    urgencyHint = "Medium";
  }

  // 🌱 Low effort / casual tasks
  if (
    text.includes("read") ||
    text.includes("watch") ||
    text.includes("review")
  ) {
    priorityHint = "Low";
  }

  return {
    priorityHint,
    urgencyHint
  };
};

module.exports = { analyzeTask };
