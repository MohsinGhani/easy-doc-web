"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";

interface Props {
  heading: string;
  className?: string;
  status: "pending" | "active" | "completed" | "cancelled";
  icon: string;
}

const AppointmentsEnumCard = ({ heading, className, status, icon }: Props) => {
  const { appointments } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();

  const filteredAppointments = appointments.filter((a) => a.status === status);

  useEffect(() => {
    dispatch(appointmentsThunks.getAllAppointments());
  }, [dispatch]);

  return (
    <Card
      className={cn(
        `w-1/3 h-60 flex flex-col items-center justify-center gap-7 cursor-pointer`,
        {
          "bg-appointments": status === "pending",
          "bg-yellow-300": status === "active",
          "bg-green-200": status === "completed",
          "bg-destructive": status === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        {/* <h2 className="text-32-bold text-white">{count}</h2> */}
        <Link href={""}>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    "border-2 rounded-xl text-lg px-4 py-2 font-bold",
                    className
                  )}
                >
                  {filteredAppointments.length}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-popover text-sm text-popover-foreground p-2"
              >
                View More
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>

      <h1 className="font-bold text-3xl text-muted-foreground">{heading}</h1>
    </Card>
  );
};

export default AppointmentsEnumCard;
