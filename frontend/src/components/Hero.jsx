import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-400 mb-4"
        >
          AI Productivity Companion (Local Ollama)
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Get More Done, <br />
          <span className="text-neutral-400">
            Without Feeling Overwhelmed.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto"
        >
          Turn any task into a clear plan with subtasks, realistic time
          estimates, and priorities — powered by a calm, local AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center gap-4"
        >
          <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-medium">
            Get Started Free
          </button>
          <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition">
            See How It Works →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
