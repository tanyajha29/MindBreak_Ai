import { useState } from "react";
import { motion } from "framer-motion";
import {DashboardLayout} from "../components/dashboard/DashboardLayout";
import { TrendingUp, CheckCircle, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


export default function InsightsPage() {
  const [range, setRange] = useState<"day" | "week" | "month">("week");

  // Dummy data inline (REMOVE when backend connects)
  const DATA = {
    day: { completed: 6, focus: "3h 20m", score: "72%" },
    week: { completed: 32, focus: "21h", score: "84%" },
    month: { completed: 120, focus: "92h", score: "81%" },
  };

  const productivityData = [
  { name: "Mon", productivity: 62 },
  { name: "Tue", productivity: 68 },
  { name: "Wed", productivity: 74 },
  { name: "Thu", productivity: 80 },
  { name: "Fri", productivity: 84 },
  { name: "Sat", productivity: 78 },
  { name: "Sun", productivity: 81 },
];

const completionData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 6 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 7 },
  { name: "Fri", tasks: 10 },
  { name: "Sat", tasks: 3 },
  { name: "Sun", tasks: 6 },
];

  const current = DATA[range];

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-white">Insights</h1>
          <p className="text-sm text-gray-400">
            Productivity overview & performance trends
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex gap-3">
          {["day", "week", "month"].map((item) => (
            <motion.button
              key={item}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRange(item as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize
                border transition
                ${
                  range === item
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                    : "bg-[#0f172a] text-gray-400 border-white/10 hover:text-white"
                }`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* SUMMARY CARDS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <InsightCard
            icon={<CheckCircle size={18} />}
            label="Tasks Completed"
            value={current.completed}
            color="green"
          />

          <InsightCard
            icon={<Clock size={18} />}
            label="Focus Time"
            value={current.focus}
            color="blue"
          />

          <InsightCard
            icon={<TrendingUp size={18} />}
            label="Productivity Score"
            value={current.score}
            color="purple"
          />
        </motion.div>

        {/* CHARTS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 space-y-6"
        >
          <h2 className="text-lg font-semibold text-white">
            Productivity Trends
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Line Chart */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="h-56 bg-black/30 border border-white/10 rounded-xl p-4"
  >
    <p className="text-sm text-gray-400 mb-2">
      Productivity Trend
    </p>

    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={productivityData}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="productivity"
          stroke="#a855f7"
          strokeWidth={3}
          dot={{ r: 4 }}
          fill="url(#lineGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>

  {/* Bar Chart */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="h-56 bg-black/30 border border-white/10 rounded-xl p-4"
  >
    <p className="text-sm text-gray-400 mb-2">
      Tasks Completed
    </p>

    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={completionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Bar
          dataKey="tasks"
          radius={[6, 6, 0, 0]}
          fill="#ec4899"
        />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
</div>

        </motion.div>

      </div>
    </DashboardLayout>
  );
}

/* ---------------------------------- */
/* Reusable Components */
/* ---------------------------------- */

function InsightCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "green" | "blue" | "purple";
}) {
  const glowMap = {
    green: "shadow-green-500/30 text-green-400",
    blue: "shadow-blue-500/30 text-blue-400",
    purple: "shadow-purple-500/30 text-purple-400",
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 30px rgba(168,85,247,0.35)",
      }}
      className="relative bg-black/30 border border-white/10
        rounded-2xl p-5 overflow-hidden"
    >
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {icon}
        {label}
      </div>

      <p className="text-2xl font-semibold text-white mt-2">
        {value}
      </p>

      {/* Glow */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl
          blur-xl opacity-0 hover:opacity-100 transition
          ${
            color === "green"
              ? "bg-green-500/10"
              : color === "blue"
              ? "bg-blue-500/10"
              : "bg-purple-500/10"
          }`}
      />
    </motion.div>
  );
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="h-56 rounded-xl bg-black/30
        border border-white/10
        flex items-center justify-center
        text-sm text-gray-500"
    >
      {label}
    </div>
  );
}
