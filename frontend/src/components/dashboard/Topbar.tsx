import { motion } from "framer-motion";

export function Topbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-60 right-0 h-20
        bg-[#0b0f1a]/80 backdrop-blur-xl
        border-b border-white/10
        flex items-center justify-between px-8
        text-white z-30"
    >
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold tracking-wide"
      >
        Dashboard
      </motion.h1>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative h-10 w-10 rounded-xl
            flex items-center justify-center
            hover:bg-white/5 transition"
        >
          
          

          {/* Subtle pulse */}
          <span className="absolute inset-0 rounded-xl bg-red-500/20 blur-xl opacity-0 hover:opacity-100 transition" />
        </motion.button>

        {/* User Avatar */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-10 w-10 rounded-full
            bg-gradient-to-br from-purple-500 to-pink-500
            flex items-center justify-center font-bold
            cursor-pointer shadow-md"
        >
          T

          {/* Glow ring */}
          <span className="absolute inset-0 rounded-full ring-2 ring-purple-400/40 blur-sm opacity-0 hover:opacity-100 transition" />
        </motion.div>
      </div>
    </motion.header>
  );
}
