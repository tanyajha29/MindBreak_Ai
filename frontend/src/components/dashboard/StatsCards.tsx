import { motion } from "framer-motion";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: 24,
    icon: ListTodo,
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(56,189,248,0.45)",
  },
  {
    title: "Completed",
    value: 12,
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-400",
    glow: "rgba(34,197,94,0.45)",
  },
  {
    title: "Pending",
    value: 12,
    icon: Clock,
    color: "from-yellow-500 to-orange-400",
    glow: "rgba(234,179,8,0.45)",
  },
  {
    title: "Productivity",
    value: "68%",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.45)",
  },
];

export default function StatsCards() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12 },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: `0 0 40px ${stat.glow}`,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-[#0f172a]
              border border-white/10
              rounded-2xl p-5
              overflow-hidden group"
          >
            {/* Gradient top border */}
            <span
              className={`absolute inset-x-0 top-0 h-[2px]
                bg-gradient-to-r ${stat.color}`}
            />

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: -5, scale: 1.1 }}
              className={`inline-flex items-center justify-center
                h-10 w-10 rounded-xl
                bg-gradient-to-br ${stat.color}
                text-white mb-4 shadow-lg`}
            >
              <Icon size={20} />
            </motion.div>

            {/* Title */}
            <p className="text-sm text-gray-400 tracking-wide">
              {stat.title}
            </p>

            {/* Value */}
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-semibold text-white mt-2"
            >
              {stat.value}
            </motion.h2>

            {/* Hover glow layer */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl
                opacity-0 group-hover:opacity-100
                transition duration-500
                bg-gradient-to-br from-white/5 via-transparent to-transparent"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
