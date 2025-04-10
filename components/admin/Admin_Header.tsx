import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Admin_Header({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <SidebarTrigger />
      <p className="font-medium">{title}</p>
    </div>
  );
}

export default Admin_Header;
