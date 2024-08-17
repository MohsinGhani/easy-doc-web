// import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "completed";
  label: string;
  icon: string;
};

export const StatCard = ({ label, icon, type }: StatCardProps) => {
  // const { appointments } = useAppSelector((state) => state.appointments);
  // const dispatch = useAppDispatch();

  // const filteredAppointments = appointments.filter((a) => a.status === type);

  // useEffect(() => {
  //   dispatch(appointmentsThunks.getAllAppointments());
  // }, [dispatch]);

  return (
    <Card className="w-full">
      <CardContent className="flex w-full items-start flex-col gap-3">
        <h4 className="lg:text-sm text-[12px]">{label}</h4>
        <div className="flex w-full items-center justify-between">
          {/* <h4 className="font-semibold text-lg">${filteredAppointments.length}</h4> */}
          <h4 className="font-semibold text-lg">
            ${Math.floor(Math.random() * 1000)}
          </h4>

          <Image
            src={icon}
            height={42}
            width={42}
            alt={`${type} + appointments`}
            className="size-[42px] w-fit"
          />
        </div>
      </CardContent>
    </Card>
  );
};
