"use client";

import { useAppSelector } from "@/lib/hooks";
import { Card, CardContent } from "./ui/card";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "completed";
  label: string;
  icon: JSX.Element;
  loading?: boolean;
};

export const StatCard = ({ label, icon, type }: StatCardProps) => {
  const loading = useAppSelector((state) => state.appointment.loading);

  if (loading) {
    // Skeleton Loader
    return (
      <Card className="w-full h-full">
        <CardContent className="flex w-full items-start flex-col gap-3 min-h-24 h-full xl:p-6 lg:p-4 md:p-3 p-2 animate-pulse">
          {/* Skeleton for Label */}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>

          <div className="flex w-full items-center justify-between mt-auto gap-2">
            {/* Skeleton for Amount */}
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>

            {/* Skeleton for Icon */}
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardContent className="flex w-full items-start flex-col gap-3 min-h-24 h-full xl:p-6 lg:p-4 md:p-3 p-2">
        <h4 className="lg:text-sm text-[12px]">{label}</h4>
        <div className="flex w-full items-center justify-between mt-auto gap-2">
          <h4 className="font-semibold sm:text-lg text-sm">
            ${Math.floor(Math.random() * 1000)}
          </h4>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
