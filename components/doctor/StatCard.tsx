"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

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
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

interface Props {
  heading: string;
  className?: string;
  status: "PENDING_APPROVAL" | "UPCOMING" | "COMPLETED" | "CANCELLED";
  icon: string;
}

const AppointmentsEnumCard = ({ heading, className, status, icon }: Props) => {
  const { allAppointments } = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();

  const filteredAppointments = allAppointments.filter(
    (a) => a.status === status
  );

  useEffect(() => {
    dispatch(appointmentThunks.fetchAllAppointments());
  }, [dispatch]);

  return (
    <Card
      className={cn(
        `w-1/3 h-60 flex flex-col items-center justify-center gap-7 cursor-pointer`,
        {
          "bg-appointments": status === "PENDING_APPROVAL",
          "bg-yellow-300": status === "UPCOMING",
          "bg-green-200": status === "COMPLETED",
          "bg-destructive": status === "CANCELLED",
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
