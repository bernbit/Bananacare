import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { LuScanLine, LuTrendingUp } from "react-icons/lu";
import MiniCard from "@/components/admin/MiniCard";
import { Admin_BarChart } from "@/components/admin/Admin_BarChart";
import Admin_StackBarChart from "@/components/admin/Admin_StackBarChart";
import Image from "next/image";
import { columns } from "@/components/admin/Admin_DataTable/columns";
import { DataTable } from "@/components/admin/Admin_DataTable/data-table";
import prisma from "@/lib/prisma";

// Helper functions
async function getStackedChartData() {
  const grouped = await prisma.scanResult.groupBy({
    by: ["address", "result"],
    _count: {
      result: true,
    },
  });

  // Construct a map of barangays
  const barangayMap: Record<string, any> = {};

  grouped.forEach(({ address, result, _count }) => {
    if (!barangayMap[address]) {
      barangayMap[address] = {
        key: address,
        "black-sigatoka": 0,
        cordana: 0,
        "bract-mosaic-virus": 0,
        moko: 0,
        panama: 0,
        weevil: 0,
        healthy: 0,
      };
    }

    // Handle result mapping (e.g., if DB has 'bmv' instead of full label)
    const resultKey = result === "bmv" ? "bract-mosaic-virus" : result;

    barangayMap[address][resultKey] = _count.result;
  });

  return Object.values(barangayMap);
}

async function getResultPercentage(resultType: string): Promise<string> {
  const total = await prisma.scanResult.count();
  if (total === 0) return "0.00%";
  const count = await prisma.scanResult.count({
    where: { result: resultType },
  });
  const percentage = (count / total) * 100;
  return `${percentage.toFixed(2)}%`;
}

async function getDiseaseCount(diseaseKey: string): Promise<number> {
  return prisma.scanResult.count({ where: { result: diseaseKey } });
}

async function AdminHome() {
  // Fetch all needed data in parallel
  const [
    totalScanCount,
    blackSigatokaCount,
    cordanaCount,
    bmvCount,
    mokoCount,
    panamaCount,
    weevilCount,
    healthyCount,
    blackSigatokaPercent,
    cordanaPercent,
    bmvPercent,
    mokoPercent,
    panamaPercent,
    weevilPercent,
    healthyPercent,
  ] = await Promise.all([
    prisma.scanResult.count(),
    getDiseaseCount("black-sigatoka"),
    getDiseaseCount("cordana"),
    getDiseaseCount("bmv"),
    getDiseaseCount("moko"),
    getDiseaseCount("panama"),
    getDiseaseCount("weevil"),
    getDiseaseCount("healthy"),
    getResultPercentage("black-sigatoka"),
    getResultPercentage("cordana"),
    getResultPercentage("bmv"),
    getResultPercentage("moko"),
    getResultPercentage("panama"),
    getResultPercentage("weevil"),
    getResultPercentage("healthy"),
  ]);

  const stackedChartData = await getStackedChartData();

  const chartData = [
    {
      key: "black-sigatoka",
      value: blackSigatokaCount,
      fill: "var(--color-black-sigatoka)",
    },
    {
      key: "cordana",
      value: cordanaCount,
      fill: "var(--color-cordana)",
    },
    {
      key: "bract-mosaic-virus",
      value: bmvCount,
      fill: "var(--color-bmv)",
    },
    {
      key: "moko",
      value: mokoCount,
      fill: "var(--color-moko)",
    },
    {
      key: "panama",
      value: panamaCount,
      fill: "var(--color-panama)",
    },
    {
      key: "weevil",
      value: weevilCount,
      fill: "var(--color-weevil)",
    },
    {
      key: "healthy",
      value: healthyCount,
      fill: "var(--color-primary)",
    },
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

  // Example: fetch all scan results for the table (customize as needed)
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

  const cardData = [
    {
      icon: <LuScanLine className="text-primary size-5" />,
      label: "Total Disease Reports",
      data: totalScanCount,
    },
    {
      icon: (
        <Image
          src="/img/BlackSigatoka_Icon.png"
          width={30}
          height={30}
          alt="Black Sigatoka"
        />
      ),
      label: "Black Sigatoka",
      data: blackSigatokaPercent,
    },
    {
      icon: (
        <Image
          src="/img/Cordana_Icon.png"
          width={30}
          height={30}
          alt="Cordana"
        />
      ),
      label: "Cordana",
      data: cordanaPercent,
    },
    {
      icon: (
        <Image
          src="/img/BMV_Icon.png"
          width={30}
          height={30}
          alt="Bract Mosaic Virus"
        />
      ),
      label: "Bract Mosaic Virus",
      data: bmvPercent,
    },
    {
      icon: (
        <Image src="/img/Moko_Icon.png" width={30} height={30} alt="Moko" />
      ),
      label: "Moko",
      data: mokoPercent,
    },
    {
      icon: (
        <Image src="/img/Panama_Icon.png" width={30} height={30} alt="Panama" />
      ),
      label: "Panama",
      data: panamaPercent,
    },
    {
      icon: (
        <Image src="/img/Weevil_Icon.png" width={30} height={30} alt="Weevil" />
      ),
      label: "Weevil",
      data: weevilPercent,
    },
    {
      icon: <LuTrendingUp className="text-primary size-5" />,
      label: "Healthy",
      data: healthyPercent, // Replace with actual calculation if needed
    },
  ];

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
