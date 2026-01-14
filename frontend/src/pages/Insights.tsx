import { useState } from "react";

/* ------------------ TYPES ------------------ */
type TimeRange = "daily" | "weekly" | "monthly";

/* ------------------ DUMMY DATA ------------------ */
const productivitySummary = {
  bestDay: "Tuesday",
  bestTime: "Evening",
  completed: 18,
  pending: 6,
  overdue: 2,
};

const chartData = {
  daily: [3, 5, 2, 6, 4],
  weekly: [12, 18, 15, 20],
  monthly: [60, 72, 55, 80],
};

/* ------------------ COMPONENT ------------------ */
export default function Insights() {
  const [activeRange, setActiveRange] = useState<TimeRange>("weekly");

  return (
    <div className="relative">
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-[420px] bg-white border-l shadow-lg p-6 overflow-y-auto">
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6">📊 Productivity Insights</h2>

        {/* Time Menu */}
        <div className="flex gap-3 mb-8">
          {["daily", "weekly", "monthly"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range as TimeRange)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  activeRange === range
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h3 className="font-semibold mb-3">🧠 Productivity Summary</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Best day: <b>{productivitySummary.bestDay}</b></li>
            <li>Best time: <b>{productivitySummary.bestTime}</b></li>
            <li>Completed tasks: <b>{productivitySummary.completed}</b></li>
            <li>Pending tasks: <b>{productivitySummary.pending}</b></li>
            <li>Overdue tasks: <b>{productivitySummary.overdue}</b></li>
          </ul>
        </div>

        {/* Chart 1: Task Completion Trend */}
        <div className="mb-10">
          <h4 className="font-medium mb-4">📈 Task Completion Trend</h4>
          <div className="flex items-end gap-3 h-32">
            {chartData[activeRange].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-black rounded-t-md"
                  style={{ height: `${value * 4}px` }}
                />
                <span className="text-xs mt-2 text-gray-500">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You are most consistent in the middle of the period.
          </p>
        </div>

        {/* Chart 2: Task Status Breakdown */}
        <div className="mb-10">
          <h4 className="font-medium mb-4">🍩 Task Status Breakdown</h4>
          <div className="flex gap-4 text-sm">
            <span>✅ Completed: 65%</span>
            <span>⏳ Pending: 25%</span>
            <span>❌ Overdue: 10%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Majority of your tasks are getting completed on time.
          </p>
        </div>

        {/* Chart 3: Time Estimation Accuracy */}
        <div>
          <h4 className="font-medium mb-4">⏱ Planned vs Actual Time</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs mb-1">Planned</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 w-[70%] bg-black rounded" />
              </div>
            </div>
            <div>
              <p className="text-xs mb-1">Actual</p>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 w-[85%] bg-gray-500 rounded" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You usually underestimate tasks slightly.
          </p>
        </div>
      </div>
    </div>
  );
}
