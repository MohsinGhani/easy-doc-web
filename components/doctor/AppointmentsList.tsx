import React from "react";
import { Button } from "../ui/button";
import { Appointment } from "@/types/appointment";
import { AlarmCheck } from "lucide-react";

interface AppointmentsListProps {
  appointments: Appointment[];
  onSelect: (appointment: Appointment) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onSelect,
}) => {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex items-center justify-between cursor-pointer"
          onClick={() => onSelect(appointment)}
        >
          <div>
            <p className="text-zinc-600 text-xs font-normal leading-none mb-4">Today, 08:30 am - 10:30 am</p>
            <p className="text-sm font-semibold">{appointment.time}</p>
            <p className="text-sm text-gray-600">{appointment.patientName}</p>
            <p className="text-xs text-primary">{appointment.issue}</p>
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
