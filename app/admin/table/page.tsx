import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { columns } from "@/components/admin/Admin_DataTable/columns";
import { DataTable } from "@/components/admin/Admin_DataTable/data-table";
import prisma from "@/lib/prisma";

async function page() {
  const scanResults = await prisma.scanResult.findMany({
    select: {
      name: true,
      email: true,
      address: true,
      age: true,
      phoneNumber: true,
      result: true,
      imgUrl: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Admin_Header title="Table" />
      <div className="bg-primary/10 h-full flex-1 rounded-2xl p-4">
        <DataTable columns={columns} data={scanResults} />
      </div>
    </>
  );
}

export default page;
