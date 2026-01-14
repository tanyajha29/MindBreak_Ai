export default function AiPanel() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">🤖 AI Task Breakdown</h2>

      <input
        className="w-full border rounded-lg px-4 py-2 mb-4"
        placeholder="e.g. Prepare for DBMS exam"
      />

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Generate Breakdown
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p>• Revise basics</p>
        <p>• Practice numericals</p>
        <p>• Solve previous papers</p>
      </div>
    </div>
  );
}
