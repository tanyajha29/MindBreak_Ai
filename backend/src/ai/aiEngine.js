const { detectMode } = require("./modeDetector");
const { runOllama } = require("./ollamaClient");
const { productivityPrompt } = require("./prompts");

async function runAI(userMessage) {
  const mode = detectMode(userMessage);

  let prompt;
console.log("🧠 Sending prompt to Ollama...");
console.log(prompt);

  if (mode === "PRODUCTIVITY") {
    prompt = productivityPrompt(userMessage);
  } else {
    prompt = userMessage;
  }
console.log("✅ Ollama responded");

  const response = await runOllama(prompt);
  return response;
}

module.exports = runAI;
