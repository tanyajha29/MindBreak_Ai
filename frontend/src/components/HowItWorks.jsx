import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="text-2xl md:text-3xl font-semibold tracking-tight"
      >
        How it works
      </motion.h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { n: "01", title: "Add a task", desc: "Type what you need to do. Keep it natural." },
          { n: "02", title: "AI plans it", desc: "Subtasks, time estimates, and a priority level." },
          { n: "03", title: "You execute", desc: "Start with the next action and build momentum." },
        ].map((s, idx) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/55 dark:bg-neutral-950/35 backdrop-blur-xl p-5"
          >
            <div className="text-xs text-neutral-500">{s.n}</div>
            <div className="mt-2 font-semibold">{s.title}</div>
            <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
