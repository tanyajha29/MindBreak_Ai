import { motion } from "framer-motion";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed";
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Prepare AI task breakdown flow",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Design dashboard UI",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 3,
    title: "Connect auth middleware",
    priority: "Low",
    status: "Pending",
  },
];

const priorityColors: Record<Task["priority"], string> = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-green-500/20 text-green-400",
};

export default function TaskPreview() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#0f172a] border border-white/10 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">Tasks</h3>

        <motion.button
          whileHover={{ x: 4 }}
          className="text-sm text-purple-400"
        >
          View all
        </motion.button>
      </div>

      {/* Task List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="space-y-3"
      >
        {tasks.map((task) => {
          const completed = task.status === "Completed";

          return (
            <motion.div
              key={task.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -2,
                boxShadow: "0 0 20px rgba(168,85,247,0.25)",
              }}
              className="flex items-center justify-between
                bg-black/30 rounded-xl p-4
                border border-white/5 transition"
            >
              {/* Left: Checkbox + Info */}
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleTask(task.id)}
                  className={`h-5 w-5 rounded-md border flex items-center justify-center
                    ${
                      completed
                        ? "bg-purple-500 border-purple-500"
                        : "border-white/30"
                    }`}
                >
                  {completed && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </motion.button>

                {/* Task Info */}
                <div>
                  <p
                    className={`text-sm font-medium transition
                      ${
                        completed
                          ? "line-through opacity-60 text-gray-300"
                          : "text-white"
                      }`}
                  >
                    {task.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {task.status}
                  </p>
                </div>
              </div>

              {/* Priority */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${priorityColors[task.priority]}
                  shadow-inner`}
              >
                {task.priority}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
