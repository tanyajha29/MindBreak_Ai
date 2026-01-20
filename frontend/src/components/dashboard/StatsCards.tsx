interface Props {
  stats: {
    total: string;
    completed: string;
    pending: string;
  };
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Total Tasks" value={stats.total} />
      <Card title="Completed" value={stats.completed} />
      <Card title="Pending" value={stats.pending} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#0d1024] p-6 rounded-xl border border-white/10">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
