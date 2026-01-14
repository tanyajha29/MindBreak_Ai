import { useState } from "react";
import InsightsFilters from "../components/insights/InsightsFilter";
import InsightsOverview from "../components/insights/InsightsOverview";
import InsightsStats from "../components/insights/InsightsStats";
import InsightsDrawer from "../components/insights/InsightsDrawer";
import{ DashboardLayout} from "../components/dashboard/DashboardLayout";

export default function Insights() {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="text-muted-foreground">
            Productivity analysis & trends
          </p>
        </div>

        {/* Filters */}
        <InsightsFilters range={range} setRange={setRange} />

        {/* Overview Chart */}
        <InsightsOverview range={range} />

        {/* Stats */}
        <InsightsStats />

        {/* Drawer Trigger */}
        <button
          onClick={() => setOpenDrawer(true)}
          className="text-sm text-primary underline"
        >
          View detailed analysis
        </button>

        {/* Drawer */}
        <InsightsDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </div>
    </DashboardLayout>
  );
}
