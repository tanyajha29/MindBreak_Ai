import fetch from "node-fetch";
import { productivityPrompt } from "../ai/prompts.js";

const OLLAMA_URL = process.env.OLLAMA_BASE_URL;
const MODEL = process.env.OLLAMA_MODEL;

export const runProductivityAI = async (task) => {
  const prompt = productivityPrompt(task);

  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = await response.json();
  return JSON.parse(data.response);
};
