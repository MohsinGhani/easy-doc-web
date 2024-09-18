"use client";

import * as React from "react";
import { createAppointment, upcomingColumns } from "../table/columns";
import { BaseAppointment } from "@/types/table";
import { DataTable } from "../table/data-table";

let upcomingAppointments: BaseAppointment[] = [];

for (let index = 0; index < 20; index++) {
  const appointment = createAppointment((index + 1).toString(), index + 1);
  upcomingAppointments.push(appointment);
}

interface UpcomingAppointmentsListProps {
  headerType?: "primary" | "secondary";
}

const UpcomingAppointmentsList = ({
  headerType = "primary",
}: UpcomingAppointmentsListProps) => {
  const isPrimaryHeader = headerType === "primary";

  const handleMeetingJoin = (appointment: BaseAppointment) => {
    console.log("🚀 ~ handleMeetingJoin ~ appointment:", appointment);
  };

  const handleChat = (appointment: BaseAppointment) => {
    console.log("🚀 ~ handleChat ~ appointment:", appointment);
  };

  const columns = React.useMemo(
    () => upcomingColumns({ handleMeetingJoin, handleChat }),
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={upcomingAppointments}
        isPrimaryHeader={isPrimaryHeader}
        title="Upcoming Appintments"
      />
    </>
  );
};

export default UpcomingAppointmentsList;
