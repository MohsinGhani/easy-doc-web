"use client";

import React from "react";
import { Button } from "../ui/button";
import { AlarmCheck } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

interface AppointmentsListProps {
  appointments: Appointment[];
  onSelect: (appointment: Appointment) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onSelect,
}) => {
  const loading = useAppSelector((state) => state.appointment.loading);

  if (loading) {
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {/* Skeleton Loader */}
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between animate-pulse"
          >
            <div>
              <div className="bg-gray-300 h-3 w-24 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 w-36 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 w-32 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 w-20 rounded"></div>
            </div>
            <Button
              variant="ghost"
              size={"icon"}
              className="pointer-events-none"
            >
              <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {appointments?.map((appointment) => (
        <div
          key={appointment?.appointmentId}
          className="flex items-center justify-between cursor-pointer"
          onClick={() => onSelect(appointment)}
        >
          <div>
            <p className="text-zinc-600 text-xs font-normal leading-none mb-4">
              Today, {appointment?.scheduled_date?.start_time} -{" "}
              {appointment?.scheduled_date?.end_time}
            </p>
            <p className="text-sm font-semibold">
              {appointment?.scheduled_date?.start_time}
            </p>
            <p className="text-sm text-gray-600">
              {appointment?.patient?.patient_name}
            </p>
            <p className="text-xs text-primary">{appointment?.reason}</p>
          </div>
          <Button variant="ghost" size={"icon"}>
            <AlarmCheck className="w-6 h-6 fill-white" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
