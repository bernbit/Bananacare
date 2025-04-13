import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { FaSprayCan, FaUsers } from "react-icons/fa";
import { MdScanner } from "react-icons/md";
import { LuScanLine, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import MiniCard from "@/components/admin/MiniCard";
import { Admin_BarChart } from "@/components/admin/Admin_BarChart";
import Admin_StackBarChart from "@/components/admin/Admin_StackBarChart";

import Image from "next/image";

import { Payment, columns } from "@/components/admin/Admin_DataTable/columns";
import { DataTable } from "@/components/admin/Admin_DataTable/data-table";

function AdminHome() {
  const chartData = [
    {
      key: "black-sigatoka",
      value: 100,
      fill: "var(--color-black-sigatoka)",
    },
    { key: "cordana", value: 200, fill: "var(--color-cordana)" },
    {
      key: "bract-mosaic-virus",
      value: 187,
      fill: "var(--color-bmv",
    },
    { key: "moko", value: 173, fill: "var(--color-moko)" },
    { key: "panama", value: 300, fill: "var(--color-panama)" },
    { key: "weevil", value: 130, fill: "var(--color-weevil)" },
  ];

  const chartConfig = {
    value: {
      label: "Disease",
    },
    "black-sigatoka": {
      label: "Black Sigatoka",
    },
    cordana: {
      label: "Cordana",
    },
    "bract-mosaic-virus": {
      label: "Bract Mosaic Virus",
    },
    moko: {
      label: "Moko",
    },
    panama: {
      label: "Panama",
    },
    weevil: {
      label: "Weevil",
    },
  };

  // const currentCount = 152; // Example: this week
  // const previousCount = 135; // Example: last week

  // const percentageChange =
  //   ((currentCount - previousCount) / previousCount) * 100;
  // const isIncrease = percentageChange >= 0;

  // const formattedChange = Math.abs(percentageChange.toFixed(1)); // e.g. 12.6
  // const arrow = isIncrease ? "🔺" : "🔻";
  // const color = isIncrease ? "green" : "red";

  const data = [
    {
      name: "Ready Player",
      email: "ready11@example.com",
      address: "Alcadesma",
      age: "34",
      phone: "09081237890",
    },
    {
      name: "Juan Farmer",
      email: "ready@gmail.com",
      address: "Bato",
      age: "54",
      phone: "09081237890",
    },
    {
      name: "Perdo Lucas",
      email: "ready23@gmail.com",
      address: "Conrazon",
      age: "33",
      phone: "09081237890",
    },
  ];

  return (
    <>
      <Admin_Header title="Overview" />
      <div className="bg-primary/20 flex h-full flex-col gap-2 rounded-2xl border-none p-4">
        {/* Card */}
        <div className="bg-light grid grid-cols-2 gap-2 rounded-md p-2 md:grid-cols-4">
          <MiniCard
            icon={<LuScanLine className="text-primary size-5" />}
            label={"Total Disease Reports"}
            data={"334"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/BlackSigatoka_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Black Sigatoka"}
            data={"20%"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/Cordana_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Cordana"}
            data={"20%"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/BMV_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Bract Mosiac Virus"}
            data={"20%"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/Moko_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Moko"}
            data={"20%"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/Panama_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Panama"}
            data={"20%"}
          />

          <MiniCard
            icon={
              <Image
                src={"/img/Weevil_Icon.png"}
                width={30}
                height={30}
                alt="rer"
              />
            }
            label={"Weevil"}
            data={"20%"}
          />
          <MiniCard
            icon={<LuTrendingUp className="text-primary size-5" />}
            label={"Healthy"}
            data={"20%"}
          />
        </div>
        {/* Graph */}
        <div className="flex flex-col gap-2 md:flex-row">
          <Admin_StackBarChart />
          <Admin_BarChart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default AdminHome;
