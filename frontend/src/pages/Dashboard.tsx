import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import TaskPreview from "../components/dashboard/TaskPreview";
import NotificationsPanel from "../components/dashboard/NotificationPanel";
import TodayFocus from "../components/dashboard/TodayFocus";
import { fetchDashboard } from "../api/dashboard";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <StatsCards stats={data.stats} />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <TaskPreview tasks={data.todayTasks} />
            <NotificationsPanel notifications={data.notifications} />
          </div>

          <TodayFocus focus={data.focus} />
        </div>
      </div>
    </DashboardLayout>
  );
}
