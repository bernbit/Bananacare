import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Admin_Sidebar } from "@/components/admin/Admin_Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  } else if (session?.user?.email !== "bananacare@gmail.com") {
    redirect("/");
  }

  console.log(session);

  return (
    <SidebarProvider className="">
      <Admin_Sidebar />
      <main className="bg-light flex-1 overflow-auto px-4">{children}</main>
    </SidebarProvider>
  );
}
