import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t border-white/10 bg-black/30 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row">
        <span>© 2026 DayBreak. All rights reserved.</span>

        <div className="flex gap-6">
          <a className="hover:text-white transition" href="#">Privacy</a>
          <a className="hover:text-white transition" href="#">Terms</a>
          <a className="hover:text-white transition" href="#">Contact</a>
        </div>
      </div>
    </motion.footer>
  );
}
