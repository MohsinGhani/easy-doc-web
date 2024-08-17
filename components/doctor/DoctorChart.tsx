"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  { month: "January", revenue: 500, patients: 5 },
  { month: "February", revenue: 800, patients: 7 },
  { month: "March", revenue: 1200, patients: 12 },
  { month: "April", revenue: 1000, patients: 10 },
  { month: "May", revenue: 1500, patients: 15 },
  { month: "June", revenue: 2300, patients: 23 },
  { month: "July", revenue: 1700, patients: 17 },
  { month: "August", revenue: 3000, patients: 30 },
  { month: "September", revenue: 2400, patients: 24 },
  { month: "October", revenue: 1400, patients: 14 },
  { month: "November", revenue: 500, patients: 5 },
  { month: "December", revenue: 4100, patients: 41 },
];

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DoctorChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue and Patient Count</CardTitle>
        <CardDescription>
          Showing total revenue and patient count of this year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="patients"
              type="natural"
              fill="var(--color-patients)"
              fillOpacity={0.4}
              stroke="var(--color-patients)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 font-medium leading-none">
          Revenue increased up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
