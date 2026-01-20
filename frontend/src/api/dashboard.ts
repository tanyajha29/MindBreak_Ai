// src/api/dashboard.ts

export interface DashboardData {
  stats: {
    total: string;
    completed: string;
    pending: string;
  };
  todayTasks: {
    id: number;
    title: string;
    priority: "low" | "medium" | "high";
  }[];
  notifications: string[];
  focus: {
    message: string;
    suggestion: string;
  };
}

export async function fetchDashboard(): Promise<DashboardData> {
  const token = localStorage.getItem("Token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await fetch("http://localhost:5000/api/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ CORRECT
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Dashboard fetch failed: ${res.status}`);
  }

  return res.json();
}
