import DashboardSidebar from "./components/DashboardSidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8" data-lenis-prevent>
        {children}
      </main>
    </div>
  );
}
