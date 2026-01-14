import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Insights", path: "/insights" },
  { name: "Notifications", path: "/notifications" },
  { name: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-60 bg-[#0b0f1a] border-r border-white/10 text-white flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 text-2xl font-bold tracking-wide">
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          DayBreak
        </span>
      </div>

      {/* Menu */}
      <nav className="px-3 space-y-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative block overflow-hidden rounded-xl`
            }
          >
            {({ isActive }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 6 }}
                className={`px-4 py-3 text-sm flex items-center gap-3 transition-all duration-300
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-600/80 to-pink-500/80 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.span
                    layoutId="activeSidebarItem"
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-full"
                  />
                )}

                <span className="relative z-10">{item.name}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom fade */}
      <div className="mt-auto h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </motion.aside>
  );
}
