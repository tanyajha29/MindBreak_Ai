// src/pages/InsightsPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
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
      <div className="space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Insights</h1>
          <p className="text-sm text-gray-400">Productivity overview</p>
        </div>

        {/* RANGE FILTER */}
        <div className="flex gap-3">
          {(["day", "week", "month"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-xl text-sm ${
                range === r
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {/* LOADING / ERROR */}
        {loading && <p className="text-gray-400 text-sm">Loading insights…</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* CONTENT */}
        {!loading && data && (
          <>
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KpiCard label="Tasks Done" value={data.kpis.completed} />
              <KpiCard label="Pending Tasks" value={data.kpis.pending} />
              <KpiCard label="Productivity Score" value={`${productivityScore}%`} />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="Productivity Trend">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data.productivity}>
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="#a855f7" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Task Completion">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.productivity}>
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* AI INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="AI Insights">
                {data.aiInsights.length === 0 ? (
                  <p className="text-sm text-gray-400">No insights yet</p>
                ) : (
                  data.aiInsights.map((text, i) => (
                    <p key={i} className="text-sm text-purple-300">{text}</p>
                  ))
                )}
              </Card>

              <Card title="Focus Suggestions">
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  <li>Focus on pending tasks first</li>
                  <li>Complete high‑priority tasks early</li>
                  <li>Avoid overloading your day</li>
                </ul>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function KpiCard({ label, value }: { label: string; value: any }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-white mt-2">{value}</p>
    </motion.div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      {children}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2">
      <h3 className="text-sm text-gray-400">{title}</h3>
      {children}
    </div>
  );
}
