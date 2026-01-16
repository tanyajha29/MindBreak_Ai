import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
            ⚡
          </div>
          <span className="text-lg font-semibold text-white">
            MindBreak AI
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm transition-colors ${
                  isActive ? "text-purple-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-purple-500"
                  />
                )}
              </Link>
            );
          })}

          {/* CTA */}
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-purple-600/30"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
