import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { FaSprayCan, FaUsers } from "react-icons/fa";
import { MdScanner } from "react-icons/md";
import { LuScanLine } from "react-icons/lu";
import MiniCard from "@/components/admin/MiniCard";
import { Admin_BarChart } from "@/components/admin/Admin_BarChart";
import Admin_StackBarChart from "@/components/admin/Admin_StackBarChart";

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
    { key: "panama", value: 230, fill: "var(--color-panama)" },
    { key: "weevil", value: 123, fill: "var(--color-weevil)" },
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

  return (
    <>
      <Admin_Header title="Overview" />
      <div className="bg-primary/20 flex h-full flex-col gap-2 rounded-2xl border-none p-4">
        {/* Card */}
        <div className="border-test flex flex-col gap-2">
          <MiniCard
            icon={<LuScanLine className="text-primary size-5" />}
            label={"Current Scan"}
            data={"334"}
          />
          <MiniCard
            icon={<FaUsers className="text-primary size-5" />}
            label={"Current"}
            data={"454"}
          />
        </div>
        {/* Graph */}
        <div>
          <Admin_BarChart chartConfig={chartConfig} chartData={chartData} />
          <Admin_StackBarChart />
        </div>
      </div>
    </>
  );
}

export default AdminHome;
