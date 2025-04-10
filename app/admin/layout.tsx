import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Admin_Sidebar } from "@/components/admin/Admin_Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="">
      <Admin_Sidebar />
      <main className="bg-light flex-1">{children}</main>
    </SidebarProvider>
  );
}
