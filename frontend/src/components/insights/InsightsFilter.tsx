type Props = {
  range: "day" | "week" | "month";
  setRange: (v: "day" | "week" | "month") => void;
};

export default function InsightsFilters({ range, setRange }: Props) {
  const tabs = ["day", "week", "month"] as const;

  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setRange(tab)}
          className={`px-4 py-2 rounded-lg text-sm capitalize
            ${range === tab
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
