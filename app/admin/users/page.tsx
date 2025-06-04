import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { columns } from "@/components/admin/Admin_UserTable/columns";
import { DataTable } from "@/components/admin/Admin_UserTable/data-table";
import prisma from "@/lib/prisma";

async function page() {
  const userResults = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <Admin_Header title="Users" />
      <div className="bg-primary/10 h-full flex-1 rounded-2xl p-4">
        <DataTable columns={columns} data={userResults} />
      </div>
    </div>
  );
}

export default page;
