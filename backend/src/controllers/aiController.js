const { analyzeTask } = require("../ai/rules");
const { productivityPrompt } = require("../ai/prompts");
const { callOllama } = require("../ai/ollamaClient");

const handleTaskAI = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    // 1️⃣ Rule-based analysis
    const analysis = analyzeTask(task);

    // 2️⃣ Build prompt
    const prompt = productivityPrompt({
      task,
      ...analysis
    });

    // 3️⃣ Call Ollama
    const aiResponse = await callOllama(prompt);

    res.json({
      success: true,
      data: JSON.parse(aiResponse)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "AI failed",
      details: err.message
    });
  }
};

module.exports = { handleTaskAI };
