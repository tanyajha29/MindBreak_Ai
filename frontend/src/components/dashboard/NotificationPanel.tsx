export default function NotificationsPanel({
  notifications,
}: {
  notifications: string[];
}) {
  return (
    <div className="bg-[#0d1024] p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>

      <ul className="space-y-2 text-sm text-gray-300">
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
