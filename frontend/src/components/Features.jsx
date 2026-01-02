import { Brain, Clock, RefreshCcw, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI Task Breakdown",
    desc: "Turns big tasks into simple, actionable steps.",
  },
  {
    icon: Clock,
    title: "Realistic Time Estimates",
    desc: "No fake optimism. Just practical planning.",
  },
  {
    icon: RefreshCcw,
    title: "Auto Rescheduling",
    desc: "Miss a task? AI reschedules smartly.",
  },
  {
    icon: BarChart,
    title: "Productivity Insights",
    desc: "Understand when you work best.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            <f.icon className="text-indigo-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-neutral-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
