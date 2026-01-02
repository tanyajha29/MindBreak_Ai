const { analyzeTask } = require("./rules");
const { buildProductivityPrompt } = require("./prompts");
const { callOllama } = require("./ollamaClient");

function safeJsonParse(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function runProductivityAI(task) {
  const meta = analyzeTask(task);
  const prompt = buildProductivityPrompt({ task, meta });

  const raw = await callOllama(prompt);
  const parsed = safeJsonParse(raw);

  if (!parsed) {
    return {
      summary: "Could not parse AI output",
      priority: meta.suggestedPriority,
      estimated_total_time_minutes: 0,
      subtasks: [],
      motivation: "Start small—one step now.",
      next_action: "Rewrite the task in simpler words.",
      debug_raw: raw
    };
  }

  // optional: enforce limits (so it stays frontend-friendly)
  if (Array.isArray(parsed.subtasks)) parsed.subtasks = parsed.subtasks.slice(0, 7);

  return parsed;
}

module.exports = { runProductivityAI };
