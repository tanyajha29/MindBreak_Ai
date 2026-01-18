// api/insights.api.ts
import api from "./api";

export const getInsights = (range: "day" | "week" | "month") =>
  api.get(`api/insights?range=${range}`);
