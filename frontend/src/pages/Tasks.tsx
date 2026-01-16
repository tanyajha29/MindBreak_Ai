import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  Task,
  Priority,
  Status,
  getTasks,
  createTask,
  updateTaskStatus,
} from "../api/tasks.api";
import { generateTaskBreakdown, AISubtask } from "../api/ai.api";

/* ---------------- TYPES ---------------- */
type Filter = "all" | "pending" | "completed" | "today";

/* ---------------- HELPERS ---------------- */
const normalizeStatus = (s: string): Status =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as Status;

/* ---------------- PAGE ---------------- */
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  /* ADD TASK */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [dueDate, setDueDate] = useState("");

  /* AI */
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiSubtasks, setAiSubtasks] = useState<AISubtask[]>([]);
  const [aiMotivation, setAiMotivation] = useState("");
  const [typedMotivation, setTypedMotivation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  /* AI SUBTASK CONFIG */
  const [selectedSubtask, setSelectedSubtask] =
    useState<AISubtask | null>(null);
  const [subtaskPriority, setSubtaskPriority] =
    useState<Priority>("Medium");
  const [subtaskDueDate, setSubtaskDueDate] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    getTasks().then((res) =>
      setTasks(
        res.data.map((t: Task) => ({
          ...t,
          status: normalizeStatus(t.status),
        }))
      )
    );
  }, []);

  /* ---------------- ADD TASK ---------------- */
  async function handleAddTask(payload?: Partial<Task>) {
    const res = await createTask({
      title: payload?.title ?? title,
      description: payload?.description ?? description,
      priority: (payload?.priority ?? priority).toLowerCase(),
      dueDate: payload?.dueDate ?? dueDate,
    });

    setTasks((prev) => [
      ...prev,
      { ...res.data, status: normalizeStatus(res.data.status) },
    ]);

    setTitle("");
    setDescription("");
    setDueDate("");
  }

  /* ---------------- TOGGLE STATUS ---------------- */
  async function toggleStatus(task: Task) {
    const newStatus: Status =
      task.status === "Pending" ? "Completed" : "Pending";

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      )
    );

    try {
      await updateTaskStatus(task.id, newStatus.toLowerCase());
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
    }
  }

  /* ---------------- AI GENERATE ---------------- */
  async function handleAIGenerate() {
    setLoadingAI(true);
    setAiMotivation("");
    setTypedMotivation("");
    setAiSubtasks([]);

    const res = await generateTaskBreakdown(aiInput);
    setAiSubtasks(res.data.data.subtasks);
    setAiMotivation(res.data.data.motivation);
    setLoadingAI(false);
  }

  /* ---------------- AI TYPING EFFECT ---------------- */
  useEffect(() => {
    if (!aiMotivation) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedMotivation((prev) => prev + aiMotivation[index]);
      index++;
      if (index >= aiMotivation.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [aiMotivation]);

  /* ---------------- FILTER ---------------- */
  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    if (filter === "pending")
      return tasks.filter((t) => t.status === "Pending");
    if (filter === "completed")
      return tasks.filter((t) => t.status === "Completed");
    if (filter === "today")
      return tasks.filter((t) => t.dueDate === today);
    return tasks;
  }, [tasks, filter]);

  /* ---------------- GROUP ---------------- */
  const todayDate = new Date().toISOString().split("T")[0];

  const todayTasks = filteredTasks.filter(
    (t) => t.dueDate === todayDate && t.status !== "Completed"
  );

  const upcomingTasks = filteredTasks.filter(
    (t) => t.dueDate !== todayDate && t.status !== "Completed"
  );

  const completedTasks = filteredTasks.filter(
    (t) => t.status === "Completed"
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-semibold text-white">Tasks</h1>

        {/* FILTERS */}
        <div className="flex gap-3">
          {["all", "pending", "completed", "today"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as Filter)}
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                filter === f
                  ? "border-purple-500 text-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                  : "border-white/10 text-gray-400 hover:border-purple-500/40"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ADD TASK */}
          <div className="bg-[#12141d] p-6 rounded-2xl space-y-4 sticky top-6 border border-white/10">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1a1d26] text-white"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1a1d26] text-white"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1a1d26] text-white"
            />

            <div className="flex gap-2">
              {(["Low", "Medium", "High"] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg transition ${
                    priority === p
                      ? "bg-purple-500/20 text-purple-400 shadow"
                      : "bg-white/5 text-gray-400 hover:bg-purple-500/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleAddTask()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
            >
              ➕ Add Task
            </button>

            <button
              onClick={() => setAiOpen(true)}
              className="w-full py-3 rounded-xl border border-purple-500 text-purple-400 hover:bg-purple-500/10"
            >
              ✨ Ask AI
            </button>
          </div>

          {/* TASK LIST */}
          <div className="md:col-span-2 bg-[#0f1117] rounded-2xl p-4 h-[70vh] overflow-y-auto space-y-6 border border-white/10">
            {[{ t: "Today", d: todayTasks },
              { t: "Upcoming", d: upcomingTasks },
              { t: "Completed", d: completedTasks }].map(
              (s) =>
                s.d.length > 0 && (
                  <section key={s.t}>
                    <h3 className="text-sm mb-3 text-purple-400">
                      {s.t}
                    </h3>
                    <div className="space-y-3">
                      {s.d.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-between items-center bg-[#1a1d26] p-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition"
                        >
                          <div className="flex gap-3">
                            <input
                              type="checkbox"
                              checked={task.status === "Completed"}
                              onChange={() => toggleStatus(task)}
                              className="accent-purple-500"
                            />
                            <div>
                              <p
                                className={`text-white ${
                                  task.status === "Completed"
                                    ? "line-through text-gray-500"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </p>
                              {task.dueDate && (
                                <p className="text-xs text-gray-500">
                                  Due: {task.dueDate}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                            {task.priority}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )
            )}
          </div>
        </div>
      </div>

      {/* AI DRAWER */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setAiOpen(false)}
            />

            <motion.div
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: "spring", stiffness: 70 }}
              className="fixed right-0 top-0 z-50 h-full w-[380px] p-6 space-y-4
                bg-gradient-to-b from-[#0f1117] to-[#0b0d12]
                border-l border-purple-500/30 shadow-2xl shadow-purple-500/30"
            >
              <h2 className="text-white font-semibold">✨ AI Assistant</h2>

              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="w-full h-28 bg-[#1a1d26] p-3 rounded-xl text-white"
                placeholder="Describe your task..."
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleAIGenerate}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                {loadingAI ? "Thinking..." : "Generate"}
              </motion.button>

              {typedMotivation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm"
                >
                  💡 {typedMotivation}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
