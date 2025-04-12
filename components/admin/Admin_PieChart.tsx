"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
// Custom Component
import Location_Picker from "./Location_Picker";

//Types
interface ChartDataType {
  key: string;
  value: number;
  fill: string;
}
interface ChartPropsType {
  chartData: ChartDataType[];
  chartConfig: ChartConfig;
}

export function Admin_PieChart({ chartData, chartConfig }: ChartPropsType) {
  return (
    <Card className="flex-1 rounded-none border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Banana Disease Detection Rate</CardTitle>
        <CardDescription>Bansud Oriental Mindoro</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <Location_Picker />

        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] w-full rounded-md pb-0"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-light text-dark border-none"
                  labelKey="value"
                  nameKey="key"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              label
              nameKey="key"
              className="font-semibold"
            />

            <ChartLegend content={<ChartLegendContent className="" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total value for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
