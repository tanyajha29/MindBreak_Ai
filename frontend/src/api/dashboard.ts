import { useEffect, useState } from "react";

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

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await fetch("/api/dashboard", {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error };
}
