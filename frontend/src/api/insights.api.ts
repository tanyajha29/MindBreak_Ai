import axios from "axios";

export function getInsights(range: "day" | "week" | "month") {
  return axios.get("/api/insights", {
    params: { range },
  });
}
