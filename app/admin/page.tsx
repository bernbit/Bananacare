import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { LuScanLine, LuTrendingUp } from "react-icons/lu";
import MiniCard from "@/components/admin/MiniCard";
import { Admin_BarChart } from "@/components/admin/Admin_BarChart";
import Admin_StackBarChart from "@/components/admin/Admin_StackBarChart";
import Image from "next/image";
import { columns } from "@/components/admin/Admin_DataTable/columns";
import { DataTable } from "@/components/admin/Admin_DataTable/data-table";
import { fetchDashboardData } from "@/lib/data";

async function AdminHome() {
  const { scanResults, stackedChartData, totalScanCount, diseaseStats } =
    await fetchDashboardData();

  const chartData = diseaseStats.map(({ key, count }) => ({
    key: key === "bmv" ? "bract-mosaic-virus" : key,
    value: count,
    fill: `var(--color-${key})`,
  }));

  const cardData = [
    {
      icon: <LuScanLine className="text-primary size-5" />,
      label: "Total Disease Reports",
      data: totalScanCount,
    },
    ...diseaseStats.map(({ key, percent }) => ({
      icon: (
        <Image
          src={`/img/${key.replace(/-/g, "_")}_Icon.png`}
          width={30}
          height={30}
          alt={key}
        />
      ),
      label:
        key === "bmv"
          ? "Bract Mosaic Virus"
          : key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "),
      data: percent,
    })),
  ];

  const chartConfig = {
    value: { label: "Disease" },
    "black-sigatoka": { label: "Black Sigatoka" },
    cordana: { label: "Cordana" },
    "bract-mosaic-virus": { label: "Bract Mosaic Virus" },
    moko: { label: "Moko" },
    panama: { label: "Panama" },
    weevil: { label: "Weevil" },
    healthy: { label: "Healthy" },
  };

  return (
    <div>
      <Admin_Header title="Overview" />
      <div className="bg-primary/20 flex h-full flex-col gap-2 rounded-2xl border-none p-4">
        {/* Card */}
        <div className="bg-light grid grid-cols-2 gap-2 rounded-md p-2 md:grid-cols-4">
          {cardData.map((card, index) => (
            <MiniCard
              key={index}
              icon={card.icon}
              label={card.label}
              data={card.data}
            />
          ))}
        </div>

        {/* Graph */}
        <div className="flex flex-col gap-2 md:flex-row">
          <Admin_StackBarChart chartData={stackedChartData} />
          <Admin_BarChart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <DataTable columns={columns} data={scanResults.slice(0, 5)} />
      </div>
    </div>
  );
}

export default AdminHome;
