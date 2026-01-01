const axios = require("axios");

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://ollama:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "phi3";

/**
 * Send prompt to Ollama and get response
 */
const runOllama = async (prompt) => {
  try {
    const response = await axios.post(
      `${OLLAMA_BASE_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt,
        stream: false
      },
      {
        timeout: 120000 // 2 minutes (important for slow models)
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("❌ Ollama error:", error.response?.data || error.message);
    throw new Error("Ollama failed");
  }
};

module.exports = { runOllama };
