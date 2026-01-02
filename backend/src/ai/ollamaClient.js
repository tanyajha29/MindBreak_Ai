const axios = require("axios");

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://ollama:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "phi3:mini";

async function callOllama(prompt) {
  const res = await axios.post(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0.2,
        top_p: 0.9,
        num_predict: 220, // keep output short
        num_ctx: 2048     // reduce RAM usage
      }
    },
    { timeout: 180000 } // first call can be slow
  );

  return (res.data?.response || "").trim();
}

module.exports = { callOllama };
