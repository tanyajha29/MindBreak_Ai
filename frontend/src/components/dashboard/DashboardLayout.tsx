import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#05060f] min-h-screen text-white">
      <Sidebar />
      <Topbar />

      {/* Main Content */}
      <main className="ml-60 pt-28 p-8">
        {children}
      </main>
    </div>
  );
}
