export default function TodayFocus({
  focus,
}: {
  focus: {
    message: string;
    suggestion: string;
  };
}) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">{focus.message}</h3>
      <p className="text-sm opacity-90">{focus.suggestion}</p>
    </div>
  );
}
