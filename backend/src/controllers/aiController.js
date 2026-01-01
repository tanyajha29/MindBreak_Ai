const runAI = require("../ai/aiEngine");

const handleAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await runAI(message);

    res.json({
      success: true,
      response: result
    });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ error: "AI failed", details: err.message });
  }
};

module.exports = { handleAI };
