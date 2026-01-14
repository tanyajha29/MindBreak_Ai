import { motion } from "framer-motion";
import { Flame, Clock } from "lucide-react";

type FocusTask = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
};

const dummyFocusTasks: FocusTask[] = [
  {
    id: 1,
    title: "Finish AI integration",
    priority: "High",
    due: "Today",
  },
  {
    id: 2,
    title: "Prepare placement resume",
    priority: "High",
    due: "Today",
  },
];

const priorityStyles: Record<FocusTask["priority"], string> = {
  High: "bg-red-500/20 text-red-400 shadow-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 shadow-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 shadow-green-500/30",
};

export default function TodayFocus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative bg-[#0f172a]
        border border-white/10
        rounded-2xl p-6
        overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Flame className="text-red-400" size={18} />
        <h3 className="text-lg font-semibold text-white">
          Today’s Focus
        </h3>
      </div>

      {/* Task List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="space-y-4"
      >
        {dummyFocusTasks.map((task) => (
          <motion.div
            key={task.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -3,
              boxShadow: "0 0 24px rgba(239,68,68,0.35)",
            }}
            className="flex items-start justify-between
              bg-black/30
              border border-white/5
              rounded-xl p-4
              transition"
          >
            {/* Left */}
            <div>
              <p className="text-sm font-medium text-white">
                {task.title}
              </p>

              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>Due: {task.due}</span>
              </div>
            </div>

            {/* Priority */}
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
                ${priorityStyles[task.priority]}
                shadow-inner`}
            >
              {task.priority}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Urgency glow */}
      <span
        className="pointer-events-none absolute inset-0
          rounded-2xl bg-red-500/10
          blur-xl opacity-0 hover:opacity-100 transition"
      />
    </motion.div>
  );
}
