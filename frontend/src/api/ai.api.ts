// src/api/ai.api.ts
import api from "./api";

export type AISubtask = {
  title: string;
  time_minutes: number;
};


export type AIBreakdownResponse = {
  success: boolean;
  data: {
    summary: string;
    priority: string;
    estimated_total_time_minutes: number;
    subtasks: AISubtask[];
    motivation: string;
  };
};

export const generateTaskBreakdown = (task: string) =>
  api.post<AIBreakdownResponse>("/api/ai/task", { task });

