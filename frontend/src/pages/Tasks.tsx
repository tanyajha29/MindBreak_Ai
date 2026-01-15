import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

type Priority = "High" | "Medium" | "Low";
type Status = "Pending" | "Completed";

type Task = {
  id: number;
  title: string;
  priority: Priority;
  status: Status;
};

export default function TasksPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [priority, setPriority] = useState<Priority>("Medium");
  const [title, setTitle] = useState("");

  const tasks: Task[] = [
    { id: 1, title: "Prepare AI task breakdown flow", priority: "High", status: "Pending" },
    { id: 2, title: "Design dashboard UI", priority: "Medium", status: "Completed" },
    { id: 3, title: "Connect auth middleware", priority: "Low", status: "Pending" },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Tasks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ADD TASK */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#12141d] rounded-2xl p-6 border border-white/10 space-y-5
              hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition"
          >
            <h2 className="text-lg font-semibold text-white">Add New Task</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full rounded-xl bg-[#1a1d26] border border-white/10 px-4 py-3
              text-sm text-white focus:ring-2 focus:ring-purple-500"
            />

            {/* PRIORITY */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Priority</p>
              <div className="flex gap-2">
                {(["Low", "Medium", "High"] as Priority[]).map((p) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-lg text-sm border transition
                      ${
                        priority === p
                          ? p === "High"
                            ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                            : p === "Medium"
                            ? "bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                            : "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                          : "border-white/10 text-gray-400 hover:bg-white/5"
                      }`}
                  >
                    {p}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-medium shadow-[0_0_20px_rgba(168,85,247,0.45)]"
            >
              ➕ Add Task
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAiOpen(true)}
              className="w-full py-3 rounded-xl border border-purple-500 text-purple-400
              hover:bg-purple-500/10 hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]"
            >
              ✨ Ask AI
            </motion.button>
          </motion.div>

          {/* TASK LIST */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="md:col-span-2 bg-[#12141d] rounded-2xl p-6 border border-white/10"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Tasks</h2>
              <span className="text-sm text-purple-400 cursor-pointer">View all</span>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center bg-[#1a1d26]
                    rounded-xl p-4 transition
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                >
                  <div className="flex gap-3">
                    <input type="checkbox" checked={task.status === "Completed"} readOnly />
                    <div>
                      <p className={`font-medium ${task.status === "Completed" ? "line-through text-gray-500" : "text-white"}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500">{task.status}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full
                      ${
                        task.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : task.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                  >
                    {task.priority}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI DRAWER */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setAiOpen(false)}
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[380px]
                bg-[#0f1117] border-l border-purple-500/30
                shadow-[0_0_40px_rgba(168,85,247,0.35)] z-50 p-5"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">✨ AI Breakdown</h2>
                <button onClick={() => setAiOpen(false)}>✕</button>
              </div>

              <textarea
                className="w-full h-32 rounded-xl bg-[#1a1d26] border border-purple-500/40 p-3 text-sm text-white"
                placeholder="Describe your task..."
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r
                  from-purple-500 to-pink-500 text-white font-medium
                  shadow-[0_0_25px_rgba(168,85,247,0.45)]"
              >
                ✨ Generate Breakdown
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
