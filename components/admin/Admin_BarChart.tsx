"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

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
} from "@/components/ui/chart";

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

export function Admin_BarChart({ chartData, chartConfig }: ChartPropsType) {
  return (
    <Card className="bg-light w-1/2 rounded-md">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value
                  .split("-")
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1),
                  )
                  .join(" ")
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-light text-dark border-none"
                  labelKey="value"
                  nameKey="key"
                />
              }
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={6}>
              <LabelList position="top" offset={20} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total value for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
