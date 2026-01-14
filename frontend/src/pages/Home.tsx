import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060f] to-[#0a0c1b] text-white">
      <Navbar />

      {/* HERO */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl font-extrabold md:text-6xl"
        >
          Get More Done <br />
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Without Feeling Overwhelmed
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-xl text-gray-400"
        >
          DayBreak uses AI to break down goals, plan your time,
          and keep you focused. Simple, calm, and productive.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex gap-4"
        >
          <button className="rounded-xl bg-purple-600 px-6 py-3 font-medium shadow-lg shadow-purple-600/40">
            Get Started Free →
          </button>
          <button className="rounded-xl border border-white/20 px-6 py-3 text-gray-300 hover:bg-white/5 transition">
            Sign In
          </button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24">
        <h2 className="mb-14 text-center text-3xl font-bold">
          Powerful Features, Simple Design
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {[
            ["Smart Task Breakdown", "AI splits complex goals into simple steps"],
            ["Intelligent Scheduling", "AI adapts your schedule dynamically"],
            ["Smart Notifications", "Context‑aware reminders"],
            ["Productivity Insights", "Clean analytics & insights"],
          ].map(([title, desc], i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg hover:border-purple-500/40 transition"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 pb-32 text-center">
        <h2 className="mb-16 text-3xl font-bold">How It Works</h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
          {[
            ["01", "Create Tasks", "Add goals in seconds"],
            ["02", "AI Does the Work", "Breakdown & scheduling"],
            ["03", "Track Progress", "Stay focused & improve"],
          ].map(([step, title, desc], i) => (
            <motion.div
              key={step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
                {step}
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
