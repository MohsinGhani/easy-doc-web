"use client";

import * as React from "react";
import { upcomingColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { Loader } from "../common/Loader";

interface UpcomingAppointmentsListProps {
  headerType?: "primary" | "secondary";
}

const UpcomingAppointmentsList = ({
  headerType = "primary",
}: UpcomingAppointmentsListProps) => {
  const isPrimaryHeader = headerType === "primary";

  const handleMeetingJoin = (appointment: Appointment) => {
    console.log("🚀 ~ handleMeetingJoin ~ appointment:", appointment);
  };

  const handleChat = (appointment: Appointment) => {
    console.log("🚀 ~ handleChat ~ appointment:", appointment);
  };

  const dispatch = useAppDispatch();

  const { allAppointments, loading } = useAppSelector(
    (state) => state.appointment
  );

  const { role, userId } = useAppSelector((state) => state.auth.user);

  React.useEffect(() => {
    // Fetch all appointments
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments());
    }
  }, [dispatch, userId, role]);

  const columns = React.useMemo(
    () => upcomingColumns({ handleMeetingJoin, handleChat }),
    []
  );

  if (loading) <Loader />;

  return (
    <>
      <DataTable
        columns={columns}
        data={allAppointments}
        isPrimaryHeader={isPrimaryHeader}
        title="Upcoming Appintments"
      />
    </>
  );
};

export default UpcomingAppointmentsList;
