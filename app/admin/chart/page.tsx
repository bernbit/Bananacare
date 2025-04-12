import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { Admin_PieChart } from "@/components/admin/Admin_PieChart";

function page() {
  const chartData = [
    {
      key: "black-sigatoka",
      value: 300,
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

    // FEBA17 fec845
  };

  return (
    <>
      <Admin_Header title="Analytics" />
      <div className="h-full flex-1 rounded-2xl">
        <div className="flex flex-col md:flex-row">
          <Admin_PieChart chartConfig={chartConfig} chartData={chartData} />
          {/* <Admin_PieChart /> */}
        </div>
      </div>
    </>
  );
}

export default page;
