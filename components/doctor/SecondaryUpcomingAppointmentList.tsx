"use client";

import React, { useMemo, useState } from "react";
import AppointmentsList from "./AppointmentsList";
import Calendar from "./Calendar";
import AppointmentCard from "./AppointmentCard";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

const SecondaryUpcomingAppointmentsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allAppointments, loading } = useAppSelector(
    (state) => state.appointment
  );

  const { role, userId } = useAppSelector((state) => state.auth.user);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = daysOfWeek[new Date().getDay()];

  const [selectedDay, setSelectedDay] = useState<string>(today);
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

  React.useEffect(() => {
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments({ status: "UPCOMING" }));
    }
  }, [dispatch, userId, role]);

  const filteredAppointments = useMemo(() => {
    const selectedMonthString = format(selectedMonth, "yyyy-MM");
    const selectedDayIndex =
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(selectedDay) +
      1;

    return allAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
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
            appointment={filteredAppointments[0] || allAppointments[0]}
          />
        )}

        <div className="space-y-6">
          <Calendar
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            onMonthChange={handleMonthChange}
            loading={loading}
            numberOfAppointments={filteredAppointments.length}
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
