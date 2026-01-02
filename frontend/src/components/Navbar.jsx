import { motion } from "framer-motion";
import { Bell, User, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "./themeContect";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            MindBreak AI
          </span>
        </div>

        {/* Center Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Search size={16} className="text-zinc-400" />
          <input
            placeholder="Search tasks, notes..."
            className="bg-transparent outline-none text-sm text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Bell size={18} className="cursor-pointer" />
          <User size={18} className="cursor-pointer" />
        </div>
      </div>
    </motion.nav>
  );
}
