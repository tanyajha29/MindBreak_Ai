import api from "./base";

export const fetchAISuggestions = () =>
  api.get("/ai/suggestions");

export const fetchInsights = () =>
  api.get("/ai/insights");
