import api from "./api";

export type Priority = "Low" | "Medium" | "High";
export type Status = "Pending" | "Completed";

export type Task = {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
};

/* Fetch all tasks */
export const getTasks = () => api.get<Task[]>("/api/tasks");

/* Create task */
export const createTask = (data: {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}) =>
  api.post<Task>("/api/tasks", {
    ...data,
    status: "pending",
  });

/* Update task status */
export const updateTaskStatus = (id: number, status: Status) =>
  api.patch(`/api/tasks/${id}`, {
    status: status.toLowerCase(),
  });
