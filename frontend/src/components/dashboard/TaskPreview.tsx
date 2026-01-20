interface Task {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
}

export default function TaskPreview({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-[#0d1024] p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Today’s Tasks</h3>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center"
          >
            <span>{task.title}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                task.priority === "high"
                  ? "bg-red-500/20 text-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {task.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
