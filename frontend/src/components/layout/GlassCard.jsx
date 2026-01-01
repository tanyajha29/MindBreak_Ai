export default function GlassCard({ children }) {
  return (
    <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
      {children}
    </div>
  );
}
