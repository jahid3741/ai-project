import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* 
        This automatically mounts the awesome Role-Based Sidebar 
        on the left side of every single dashboard page!
      */}
      <Sidebar />

      {/* 
        This is where your actual page content (overview cards, charts, tables)
        gets rendered on the right side!
      */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
