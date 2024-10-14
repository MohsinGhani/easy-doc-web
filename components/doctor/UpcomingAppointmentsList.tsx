"use client";

import * as React from "react";
import { upcomingColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

interface UpcomingAppointmentsListProps {
  headerType?: "primary" | "secondary";
}

const UpcomingAppointmentsList = ({
  headerType = "primary",
}: UpcomingAppointmentsListProps) => {
  const dispatch = useAppDispatch();
  const isPrimaryHeader = headerType === "primary";

  const { allAppointments, lastEvaluatedKey, loading } = useAppSelector(
    (state) => state.appointment
  );

  const {
    user: { role, userId },
    loading: Uloading,
  } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    // Fetch all appointments
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments({ status: "UPCOMING" }));
    }
  }, [dispatch, userId, role]);

  // Handle page change
  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAppointmentsByPagination({
        startKey: lastEvaluatedKey,
      })
    );
  };

  const columns = React.useMemo(() => upcomingColumns({}), []);

  return (
    <>
      <DataTable
        columns={columns}
        data={allAppointments}
        isPrimaryHeader={isPrimaryHeader}
        title="Upcoming Appintments"
        onPageChange={handlePageChange}
        loading={loading || Uloading}
      />
    </>
  );
};

export default UpcomingAppointmentsList;
