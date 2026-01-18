const axios = require("axios");

exports.generateSummary = async (tasks) => {
  const completed = tasks.filter(t => t.status === "COMPLETED").length;

  const prompt = `
User task data:
Total tasks: ${tasks.length}
Completed tasks: ${completed}

Analyze productivity and give:
1. Best work time
2. Burnout warning if any
3. One actionable suggestion
`;

  const res = await axios.post("http://ollama:11434/api/generate", {
    model: "llama3",
    prompt,
    stream: false,
  });

  return {
    summary: res.data.response,
  };
};
