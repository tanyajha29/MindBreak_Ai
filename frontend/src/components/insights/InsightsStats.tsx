export default function InsightsStats() {
  const stats = [
    { label: "Tasks Completed", value: "42" },
    { label: "Focus Hours", value: "18h" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-2xl font-semibold mt-2">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
