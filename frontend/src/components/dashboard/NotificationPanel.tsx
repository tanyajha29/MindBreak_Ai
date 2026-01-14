import { motion } from "framer-motion";
import { Flame, Clock, Sparkles } from "lucide-react";

const notifications = [
  {
    text: "You completed 3 tasks yesterday",
    icon: Flame,
    color: "text-orange-400",
  },
  {
    text: "Task 'AI integration' is due today",
    icon: Clock,
    color: "text-yellow-400",
  },
  {
    text: "AI suggested a new task breakdown",
    icon: Sparkles,
    color: "text-purple-400",
  },
];

export default function NotificationsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative bg-[#0f172a]
        border border-white/10
        rounded-2xl p-6
        overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.6 }}
        >
          🔔
        </motion.span>
        <h2 className="font-semibold text-white">
          Notifications
        </h2>
      </div>

      {/* List */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="space-y-3"
      >
        {notifications.map((n, i) => {
          const Icon = n.icon;

          return (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{
                x: 4,
                boxShadow: "0 0 20px rgba(168,85,247,0.25)",
              }}
              className="flex items-start gap-3
                bg-black/30
                border border-white/5
                rounded-xl p-3
                transition"
            >
              {/* Icon */}
              <span
                className={`mt-0.5 ${n.color}`}
              >
                <Icon size={16} />
              </span>

              {/* Text */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {n.text}
              </p>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Subtle glow */}
      <span
        className="pointer-events-none absolute inset-0
          rounded-2xl bg-purple-500/10
          blur-xl opacity-0 hover:opacity-100 transition"
      />
    </motion.div>
  );
}
