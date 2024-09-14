"use client";

import React, { useMemo, useState } from "react";
import AppointmentsList from "./AppointmentsList";
import Calendar from "./Calendar";
import AppointmentCard from "./AppointmentCard";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import dummyAppointments from "@/public/data/dummyAppointments";
import { Appointment } from "@/types/appointment";
import { format, parseISO } from "date-fns";

const SecondaryUpcomingAppointmentsList: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Mon");
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setSelectedAppointment(null);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(new Date(month));
    setSelectedAppointment(null);
  };

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const filteredAppointments = useMemo(() => {
    const selectedMonthString = format(selectedMonth, "yyyy-MM");
    const selectedDayIndex =
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(selectedDay) +
      1;

    return dummyAppointments.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      return (
        format(appointmentDate, "yyyy-MM") === selectedMonthString &&
        appointmentDate.getDay() === selectedDayIndex
      );
    });
  }, [selectedDay, selectedMonth]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <h1 className="xl:text-lg lg:text-base lg:text-center text-lg font-semibold leading-7">
          Upcoming Appointments
        </h1>
      </CardHeader>

      <CardContent className="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6 xl:p-6 lg:p-3">
        {selectedAppointment ? (
          <AppointmentCard appointment={selectedAppointment} />
        ) : (
          <AppointmentCard
            appointment={filteredAppointments[0] || dummyAppointments[0]}
          />
        )}

        <div className="space-y-6">
          <Calendar
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            onMonthChange={handleMonthChange}
          />

          <>
            <Separator />

            <AppointmentsList
              appointments={filteredAppointments}
              onSelect={handleAppointmentSelect}
            />
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecondaryUpcomingAppointmentsList;
