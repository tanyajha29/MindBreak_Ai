type Props = {
  range: "day" | "week" | "month";
};

export default function InsightsOverview({ range }: Props) {
  return (
    <div className="bg-card rounded-xl p-6 h-64 flex items-center justify-center">
      <p className="text-muted-foreground">
        📊 Productivity chart ({range})
      </p>
    </div>
  );
}
