import { useEffect, useState } from "react";

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    const res = await fetch("/api/dashboard", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Dashboard fetch failed");

    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return { data, loading };
}
