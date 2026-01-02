import axios from "axios";

export const runTaskAI = async (task) => {
  const res = await axios.post("http://localhost:5000/api/ai/task", {
    task
  });
  return res.data;
};
