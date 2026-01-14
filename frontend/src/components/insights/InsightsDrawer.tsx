type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InsightsDrawer({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Blur BG */}
      <div
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-[420px] bg-background p-6">
        <h2 className="text-lg font-semibold mb-4">
          Detailed Productivity Analysis
        </h2>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>• Task completion trends</p>
          <p>• Focus vs distraction</p>
          <p>• Productivity score</p>
        </div>
      </div>
    </div>
  );
}
