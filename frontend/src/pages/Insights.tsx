// src/pages/InsightsPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  CheckCircle,
  Clock,
  TrendingUp,
  LineChart,
  BarChart3,
  Sparkles,
  Target,
} from "lucide-react";
import { getInsights } from "../api/insights.api";

/* ---------------- TYPES ---------------- */
type Range = "day" | "week" | "month";

type InsightsResponse = {
  kpis: {
    completed: number;
    pending: number;
    total: number;
  };
  productivity: {
    day: string;
    completed: number;
  }[];
  aiInsights: string[];
};

/* ---------------- PAGE ---------------- */
export default function InsightsPage() {
  const [range, setRange] = useState<Range>("week");
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsights();
  }, [range]);

  async function fetchInsights() {
    try {
      setLoading(true);
      setError(null);
      const res = await getInsights(range);
      setData(res.data);
    } catch (err) {
      console.error("Insights fetch failed:", err);
      setError("Failed to load insights");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const productivityScore =
    data && data.kpis.total > 0
      ? Math.round((data.kpis.completed / data.kpis.total) * 100)
      : 0;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Insights</h1>
          <p className="text-sm text-gray-400">Productivity overview</p>
        </div>

        {/* RANGE FILTER */}
        <div className="flex gap-3">
          {(["day", "week", "month"] as Range[]).map((r) => (
            <motion.button
              key={r}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  range === r
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
            >
              {r.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* STATES */}
        {loading && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gray-400 text-sm"
          >
            Loading insights…
          </motion.p>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* CONTENT */}
        {!loading && data && (
          <>
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KpiCard
                label="Tasks Done"
                value={data.kpis.completed}
                icon={CheckCircle}
                iconColor="text-green-400"
              />
              <KpiCard
                label="Pending Tasks"
                value={data.kpis.pending}
                icon={Clock}
                iconColor="text-yellow-400"
              />
              <KpiCard
                label="Productivity Score"
                value={`${productivityScore}%`}
                icon={TrendingUp}
                highlight
              />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="Productivity Trend" icon={LineChart}>
                <ResponsiveContainer width="100%" height={220}>
                  <ReLineChart data={data.productivity}>
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#a855f7"
                      strokeWidth={3}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Task Completion" icon={BarChart3}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.productivity}>
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      fill="#ec4899"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* AI + FOCUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="AI Insights" icon={Sparkles}>
                {data.aiInsights.length === 0 ? (
                  <p className="text-sm text-gray-400">No insights yet</p>
                ) : (
                  data.aiInsights.map((text, i) => (
                    <p key={i} className="text-sm text-purple-300">
                      • {text}
                    </p>
                  ))
                )}
              </Card>

              <Card title="Focus Suggestions" icon={Target}>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  <li>Focus on pending tasks first</li>
                  <li>Complete high-priority tasks early</li>
                  <li>Avoid overloading your day</li>
                </ul>
              </Card>
            </div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function KpiCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-purple-400",
  highlight = false,
}: {
  label: string;
  value: any;
  icon: any;
  iconColor?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-2xl p-5 border bg-[#0f172a]
        ${
          highlight
            ? "border-purple-500/40 shadow-lg shadow-purple-500/30"
            : "border-white/10"
        }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{label}</p>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <p className="text-2xl font-semibold text-white mt-2">{value}</p>
    </motion.div>
  );
}

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-[#0f172a] border border-white/10 rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        <Icon className="w-4 h-4 text-purple-400" />
        <p className="text-sm">{title}</p>
      </div>
      {children}
    </motion.div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon className="w-4 h-4 text-purple-400" />
        <h3 className="text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}
