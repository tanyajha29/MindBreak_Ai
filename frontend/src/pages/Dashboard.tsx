import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ------------------ TYPES ------------------ */
type Task = {
  _id: string;
  title: string;
  priority?: "Low" | "Medium" | "High";
  status?: "pending" | "completed";
  createdAt?: string;
};

type AiBreakdown = {
  mainTask: string;
  subtasks: string[];
  estimatedTime: string;
  priority: string;
};

/* ------------------ API HELPERS ------------------ */
const API_BASE = "http://localhost:5000"; // change if needed

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ------------------ COMPONENT ------------------ */
export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResult, setAiResult] = useState<AiBreakdown | null>(null);

  const [notifications, setNotifications] = useState<string[]>([]);

  /* ------------------ AUTH GUARD ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ------------------ FETCH TASKS ------------------ */
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ------------------ AI TASK BREAKDOWN ------------------ */
  const generateAiBreakdown = async () => {
    if (!aiInput.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/ai/task`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ task: aiInput }),
      });

      const data = await res.json();
      setAiResult(data);

      // Temporary notification (until backend exists)
      setNotifications((prev) => [
        "AI generated a task breakdown ✨",
        ...prev,
      ]);
    } catch (err) {
      console.error("AI breakdown failed");
    }
  };

  /* ------------------ LOGOUT ------------------ */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05060f] to-[#0a0c1b] text-white flex">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl p-6 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-purple-400 mb-10">
          DayBreak
        </h1>

        <nav className="space-y-4 text-sm">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-purple-600/20 text-purple-300">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
            Tasks
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
            AI Planner
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto text-sm text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <main className="flex-1">
        {/* ---------------- TOPBAR ---------------- */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative group">
              <span className="cursor-pointer">🔔</span>
              {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0b0f1a] border border-white/10 rounded-xl p-4 shadow-xl opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm font-semibold mb-2">
                    Notifications
                  </p>
                  <ul className="text-xs space-y-2">
                    {notifications.map((n, i) => (
                      <li key={i} className="text-gray-300">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
              👤
            </div>
          </div>
        </header>

        {/* ---------------- CONTENT ---------------- */}
        <section className="p-6 space-y-8">
          {/* AI TASK CARD */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              AI Task Breakdown
            </h3>

            <div className="flex gap-3">
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g. Prepare for OS exam"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition"
              />
              <button
                onClick={() => {
                  setShowAiModal(true);
                  generateAiBreakdown();
                }}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg transition shadow-md hover:shadow-purple-500/30"
              >
                Generate
              </button>
            </div>
          </div>

          {/* TASK LIST */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Your Tasks</h3>

            {loading ? (
              <p className="text-gray-400">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-400">No tasks yet</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition"
                  >
                    <div className="flex justify-between">
                      <span>{task.title}</span>
                      <span className="text-xs text-purple-400">
                        {task.priority || "Medium"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {/* ---------------- AI MODAL ---------------- */}
      {showAiModal && aiResult && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0b0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg animate-in fade-in zoom-in">
            <h3 className="text-lg font-semibold mb-4">
              {aiResult.mainTask}
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
              {aiResult.subtasks.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <p className="text-sm mt-4 text-purple-400">
              ⏱ {aiResult.estimatedTime} • Priority:{" "}
              {aiResult.priority}
            </p>

            <button
              onClick={() => setShowAiModal(false)}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
