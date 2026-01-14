import {DashboardLayout} from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import TaskPreview from "../components/dashboard/TaskPreview";
import NotificationsPanel from "../components/dashboard/NotificationPanel";
import TodayFocus from "../components/dashboard/TodayFocus";


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <StatsCards />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <TaskPreview />
            <NotificationsPanel />
          </div>

          <div className="space-y-6">
             <TodayFocus />
            
          </div>
        </div>
       
      </div>
    </DashboardLayout>
  );
}
